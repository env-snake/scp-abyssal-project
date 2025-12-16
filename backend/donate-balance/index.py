import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для получения и списания баланса игрока (для Garry's Mod сервера)
    Args: event - dict с httpMethod, queryStringParameters (steam_id, action)
    Returns: HTTP response с balance
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Api-Key',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    params = event.get('queryStringParameters') or {}
    steam_id = params.get('steam_id', '').strip()
    
    if not steam_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Steam ID required'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    if method == 'GET':
        cur.execute(
            "SELECT balance, total_donated FROM players WHERE steam_id = %s",
            (steam_id,)
        )
        result = cur.fetchone()
        
        if result:
            balance, total_donated = result
        else:
            balance, total_donated = 0, 0
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'steam_id': steam_id,
                'balance': balance,
                'total_donated': total_donated
            }),
            'isBase64Encoded': False
        }
    
    elif method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action', 'check')
        
        if action == 'claim':
            cur.execute(
                "UPDATE players SET balance = 0, updated_at = CURRENT_TIMESTAMP WHERE steam_id = %s RETURNING balance",
                (steam_id,)
            )
            result = cur.fetchone()
            claimed_amount = result[0] if result else 0
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'steam_id': steam_id,
                    'claimed': claimed_amount,
                    'success': True
                }),
                'isBase64Encoded': False
            }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Invalid request'}),
        'isBase64Encoded': False
    }
