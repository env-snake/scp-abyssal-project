import json
import a2s

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}

SERVER_IP = '212.22.85.156'
SERVER_PORT = 25565


def handler(event: dict, context) -> dict:
    '''
    Проверка нахождения игрока на сервере по Steam ID.
    GET/POST ?steam_id=STEAM_0:1:12345678
    Returns: found (bool), player_name (str)
    '''
    method = event.get('httpMethod', 'GET').upper()

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': '', 'isBase64Encoded': False}

    try:
        query_params = event.get('queryStringParameters', {}) or {}
        body_str = event.get('body', '{}')
        
        if method == 'POST' and body_str:
            payload = json.loads(body_str)
            steam_id = payload.get('steam_id', '')
        else:
            steam_id = query_params.get('steam_id', '')

        if not steam_id:
            return {
                'statusCode': 400,
                'headers': HEADERS,
                'body': json.dumps({'error': 'steam_id parameter required'}),
                'isBase64Encoded': False
            }

        address = (SERVER_IP, SERVER_PORT)
        players = a2s.players(address, timeout=5)

        found_player = None
        for player in players:
            if hasattr(player, 'steam_id') and player.steam_id == steam_id:
                found_player = player
                break

        if found_player:
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({
                    'found': True,
                    'player_name': found_player.name if hasattr(found_player, 'name') else 'Unknown',
                    'server': f'{SERVER_IP}:{SERVER_PORT}'
                }),
                'isBase64Encoded': False
            }
        else:
            return {
                'statusCode': 200,
                'headers': HEADERS,
                'body': json.dumps({
                    'found': False,
                    'message': f'Player with Steam ID {steam_id} not found on server',
                    'server': f'{SERVER_IP}:{SERVER_PORT}'
                }),
                'isBase64Encoded': False
            }

    except Exception as e:
        import traceback
        print(f"Check player error: {e}")
        print(traceback.format_exc())
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
