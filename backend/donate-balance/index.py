"""Получение баланса игрока по Steam ID."""
import json
import os
import base64
import re

import psycopg2


STEAMID64_REGEX = re.compile(r'^765\d{14}$')

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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


def handler(event, context):
    """
    Получение баланса игрока.
    GET /donate-balance?steam_id=76561198000000001
    """
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': ''}

    if event.get('httpMethod') != 'GET':
        return {
            'statusCode': 405,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Method not allowed'})
        }

    params = event.get('queryStringParameters', {}) or {}
    steam_id = params.get('steam_id', '').strip()

    if not steam_id or not is_valid_steam_id(steam_id):
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid Steam ID64 format'})
        }

    S = get_schema()
    conn = get_connection()

    try:
        cur = conn.cursor()

        cur.execute(f"""
            SELECT balance, total_donated, created_at, updated_at
            FROM {S}players
            WHERE steam_id = %s
        """, (steam_id,))

        player = cur.fetchone()

        if not player:
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({
                    'steam_id': steam_id,
                    'balance': 0,
                    'total_donated': 0,
                    'exists': False
                })
            }

        balance, total_donated, created_at, updated_at = player

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({
                'steam_id': steam_id,
                'balance': balance,
                'total_donated': total_donated,
                'exists': True,
                'created_at': created_at.isoformat() if created_at else None,
                'updated_at': updated_at.isoformat() if updated_at else None
            })
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': str(e)})
        }
    finally:
        conn.close()
