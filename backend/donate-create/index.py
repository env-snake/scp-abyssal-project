"""Создание платежа для пополнения баланса игрока через YooKassa."""
import json
import os
import re
import uuid
import base64
from datetime import datetime
from urllib.request import Request, urlopen
from urllib.error import HTTPError

import psycopg2


STEAMID64_REGEX = re.compile(r'^765\d{14}$')
EMAIL_REGEX = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')
MIN_AMOUNT = 100
MAX_AMOUNT = 100000

YOOKASSA_API_URL = "https://api.yookassa.ru/v3/payments"

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
}


def get_connection():
    """Подключение к БД."""
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_schema() -> str:
    """Получить префикс схемы БД."""
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    return f"{schema}." if schema else ""


def is_valid_steam_id(steam_id: str) -> bool:
    """Проверка Steam ID64."""
    return bool(STEAMID64_REGEX.match(steam_id))


def is_valid_email(email: str) -> bool:
    """Проверка email."""
    return bool(EMAIL_REGEX.match(email))


def create_yookassa_payment(
    shop_id: str,
    secret_key: str,
    amount: float,
    description: str,
    return_url: str,
    customer_email: str,
    metadata: dict = None
) -> dict:
    """Создание платежа через YooKassa API."""
    auth_string = f"{shop_id}:{secret_key}"
    auth_bytes = base64.b64encode(auth_string.encode()).decode()
    idempotence_key = str(uuid.uuid4())

    payload = {
        "amount": {
            "value": f"{amount:.2f}",
            "currency": "RUB"
        },
        "capture": True,
        "confirmation": {
            "type": "redirect",
            "return_url": return_url
        },
        "description": description,
        "receipt": {
            "customer": {
                "email": customer_email
            },
            "items": [{
                "description": "Пополнение игрового баланса",
                "quantity": "1.000",
                "amount": {
                    "value": f"{amount:.2f}",
                    "currency": "RUB"
                },
                "vat_code": 1,
                "payment_subject": "service",
                "payment_mode": "full_payment"
            }]
        }
    }

    if metadata:
        payload["metadata"] = metadata

    request = Request(
        YOOKASSA_API_URL,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'Authorization': f'Basic {auth_bytes}',
            'Idempotence-Key': idempotence_key,
            'Content-Type': 'application/json'
        },
        method='POST'
    )

    with urlopen(request, timeout=30) as response:
        return json.loads(response.read().decode())


def handler(event, context):
    """
    Обработчик создания платежа для пополнения донат-баланса.
    Принимает Steam ID и сумму, создает платеж в YooKassa.
    """
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body = event.get('body', '{}')
    if event.get('isBase64Encoded'):
        body = base64.b64decode(body).decode('utf-8')

    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid JSON'})
        }

    steam_id = data.get('steam_id', '').strip()
    amount = data.get('amount', 0)
    user_email = data.get('user_email', '').strip()
    return_url = data.get('return_url', 'https://abyssal-scp-project.poehali.dev/donate')

    if not steam_id or not is_valid_steam_id(steam_id):
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid Steam ID64 format'})
        }

    try:
        amount = int(amount)
    except (ValueError, TypeError):
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Amount must be a number'})
        }

    if amount < MIN_AMOUNT or amount > MAX_AMOUNT:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': f'Amount must be between {MIN_AMOUNT} and {MAX_AMOUNT} RUB'})
        }

    if user_email and not is_valid_email(user_email):
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid email format'})
        }

    if not user_email:
        user_email = f"{steam_id}@steam.local"

    shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')

    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Payment system not configured'})
        }

    S = get_schema()
    conn = get_connection()

    try:
        cur = conn.cursor()
        now = datetime.utcnow().isoformat()

        order_number = f"DONATE-{datetime.now().strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"

        cur.execute(f"""
            INSERT INTO {S}players (steam_id, balance, total_donated, created_at, updated_at)
            VALUES (%s, 0, 0, %s, %s)
            ON CONFLICT (steam_id) DO NOTHING
        """, (steam_id, now, now))

        cur.execute(f"""
            INSERT INTO {S}orders
            (order_number, steam_id, user_email, amount, status, created_at, updated_at, user_name, user_phone)
            VALUES (%s, %s, %s, %s, 'pending', %s, %s, '', '')
            RETURNING id
        """, (order_number, steam_id, user_email, amount, now, now))

        order_id = cur.fetchone()[0]

        cur.execute(f"""
            INSERT INTO {S}order_items
            (order_id, product_id, product_name, product_price, quantity, created_at)
            VALUES (%s, 'donate_balance', 'Пополнение игрового баланса', %s, 1, %s)
        """, (order_id, amount, now))

        metadata = {
            "order_id": str(order_id),
            "order_number": order_number,
            "steam_id": steam_id
        }

        payment_response = create_yookassa_payment(
            shop_id=shop_id,
            secret_key=secret_key,
            amount=float(amount),
            description=f"Пополнение баланса для {steam_id} ({order_number})",
            return_url=return_url,
            customer_email=user_email,
            metadata=metadata
        )

        payment_id = payment_response.get('id')
        confirmation_url = payment_response.get('confirmation', {}).get('confirmation_url', '')

        cur.execute(f"""
            UPDATE {S}orders
            SET yookassa_payment_id = %s, payment_url = %s, updated_at = %s
            WHERE id = %s
        """, (payment_id, confirmation_url, now, order_id))

        conn.commit()

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({
                'payment_url': confirmation_url,
                'payment_id': payment_id,
                'order_id': order_id,
                'order_number': order_number
            })
        }

    except HTTPError as e:
        conn.rollback()
        error_body = e.read().decode() if e.fp else str(e)
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': f'Payment API error: {error_body}'})
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
