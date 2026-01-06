"""Webhook для обработки уведомлений от YooKassa о статусе платежа."""
import json
import os
import base64
from datetime import datetime
from urllib.request import Request, urlopen
from urllib.error import HTTPError

import psycopg2


HEADERS = {
    'Content-Type': 'application/json'
}

YOOKASSA_API_URL = "https://api.yookassa.ru/v3/payments"


def verify_payment_via_api(payment_id: str, shop_id: str, secret_key: str) -> dict:
    """Проверка статуса платежа через YooKassa API."""
    auth_string = f"{shop_id}:{secret_key}"
    auth_bytes = base64.b64encode(auth_string.encode()).decode()

    request = Request(
        f"{YOOKASSA_API_URL}/{payment_id}",
        headers={
            'Authorization': f'Basic {auth_bytes}',
            'Content-Type': 'application/json'
        },
        method='GET'
    )

    try:
        with urlopen(request, timeout=10) as response:
            return json.loads(response.read().decode())
    except (HTTPError, Exception):
        return None


def get_connection():
    """Подключение к БД."""
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_schema() -> str:
    """Получить префикс схемы БД."""
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    return f"{schema}." if schema else ""


def handler(event, context):
    """
    Обработчик webhook от YooKassa.
    Зачисляет донат-валюту игроку при успешной оплате.
    """
    body = event.get('body', '{}')
    if event.get('isBase64Encoded'):
        body = base64.b64decode(body).decode('utf-8')

    try:
        webhook_data = json.loads(body)
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid JSON'})
        }

    webhook_event = webhook_data.get('event')
    payment_object = webhook_data.get('object', {})
    payment_id = payment_object.get('id')

    if not payment_id:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Missing payment ID'})
        }

    shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')

    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Payment credentials not configured'})
        }

    verified_payment = verify_payment_via_api(payment_id, shop_id, secret_key)

    if not verified_payment:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Payment verification failed'})
        }

    payment_status = verified_payment.get('status')
    metadata = verified_payment.get('metadata', {})
    steam_id = metadata.get('steam_id')

    if not steam_id:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Missing Steam ID in metadata'})
        }

    S = get_schema()
    conn = get_connection()

    try:
        cur = conn.cursor()
        now = datetime.utcnow().isoformat()

        cur.execute(f"""
            SELECT id, amount, status FROM {S}orders
            WHERE yookassa_payment_id = %s
        """, (payment_id,))

        order = cur.fetchone()
        if not order:
            conn.close()
            return {
                'statusCode': 404,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Order not found'})
            }

        order_id, amount, current_status = order

        if current_status == 'paid':
            conn.close()
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({'status': 'already_processed'})
            }

        if payment_status == 'succeeded':
            cur.execute(f"""
                UPDATE {S}orders
                SET status = 'paid', paid_at = %s, updated_at = %s
                WHERE id = %s
            """, (now, now, order_id))

            cur.execute(f"""
                UPDATE {S}players
                SET balance = balance + %s,
                    total_donated = total_donated + %s,
                    updated_at = %s
                WHERE steam_id = %s
            """, (int(amount), int(amount), now, steam_id))

            conn.commit()

            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({
                    'status': 'success',
                    'steam_id': steam_id,
                    'amount': int(amount)
                })
            }

        elif payment_status == 'canceled':
            cur.execute(f"""
                UPDATE {S}orders
                SET status = 'canceled', updated_at = %s
                WHERE id = %s
            """, (now, order_id))

            conn.commit()

            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({'status': 'canceled'})
            }

        else:
            conn.close()
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({'status': 'pending'})
            }

    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': str(e)})
        }
    finally:
        conn.close()
