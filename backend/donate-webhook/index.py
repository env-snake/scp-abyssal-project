import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Webhook для обработки уведомлений об оплате от Т-Банк
    Args: event - dict с httpMethod, body (transaction_id, status)
    Returns: HTTP response
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
    transaction_id = body_data.get('transaction_id')
    status = body_data.get('status', 'failed')
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    if status == 'completed':
        cur.execute(
            "SELECT steam_id, amount FROM transactions WHERE id = %s",
            (transaction_id,)
        )
        result = cur.fetchone()
        
        if result:
            steam_id, amount = result
            bonus = calculate_bonus(amount)
            total_amount = amount + bonus
            
            cur.execute(
                "INSERT INTO players (steam_id, balance, total_donated) VALUES (%s, %s, %s) "
                "ON CONFLICT (steam_id) DO UPDATE SET "
                "balance = players.balance + %s, "
                "total_donated = players.total_donated + %s, "
                "updated_at = CURRENT_TIMESTAMP",
                (steam_id, total_amount, amount, total_amount, amount)
            )
            
            cur.execute(
                "UPDATE transactions SET status = 'completed', completed_at = CURRENT_TIMESTAMP WHERE id = %s",
                (transaction_id,)
            )
    else:
        cur.execute(
            "UPDATE transactions SET status = 'failed' WHERE id = %s",
            (transaction_id,)
        )
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True}),
        'isBase64Encoded': False
    }

def calculate_bonus(amount: int) -> int:
    if amount >= 5000:
        return 1250
    elif amount >= 2500:
        return 500
    elif amount >= 1000:
        return 150
    elif amount >= 500:
        return 50
    elif amount >= 250:
        return 10
    return 0
