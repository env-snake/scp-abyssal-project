import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Создание запроса на донат и перенаправление на оплату
    Args: event - dict с httpMethod, body (steam_id, amount)
    Returns: HTTP response с payment_url
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    steam_id = body_data.get('steam_id', '').strip()
    amount = body_data.get('amount', 0)
    
    if not steam_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Steam ID required'}),
            'isBase64Encoded': False
        }
    
    if amount < 100:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Minimum amount is 100'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO transactions (steam_id, amount, status) VALUES (%s, %s, 'pending') RETURNING id",
        (steam_id, amount)
    )
    transaction_id = cur.fetchone()[0]
    conn.commit()
    
    cur.close()
    conn.close()
    
    payment_url = f"https://securepayments.tinkoff.ru/payment/form/?shop_id=DEMO&amount={amount * 100}&order_id={transaction_id}&description=Donate+Abyssal+SCP+RP"
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'transaction_id': transaction_id,
            'payment_url': payment_url,
            'amount': amount
        }),
        'isBase64Encoded': False
    }
