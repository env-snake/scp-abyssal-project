"""API для проверки статуса Garry's Mod сервера"""
import json
import socket
import struct


def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if method == 'GET':
        server_ip = '212.22.85.156'
        server_port = 25565
        
        try:
            status = get_server_info(server_ip, server_port)
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(status)
            }
        except Exception as e:
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'online': False,
                    'players': 0,
                    'max_players': 0,
                    'error': str(e)
                })
            }

    return {
        'statusCode': 405,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'})
    }


def get_server_info(host: str, port: int, timeout: float = 5.0) -> dict:
    """Получает информацию о Source сервере через A2S_INFO запрос"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.settimeout(timeout)
    
    try:
        challenge_request = b'\xFF\xFF\xFF\xFF\x54\x53\x6F\x75\x72\x63\x65\x20\x45\x6E\x67\x69\x6E\x65\x20\x51\x75\x65\x72\x79\x00'
        sock.sendto(challenge_request, (host, port))
        
        data, _ = sock.recvfrom(4096)
        
        if len(data) < 5:
            raise Exception('Invalid response length')
        
        header = struct.unpack('<l', data[:4])[0]
        if header != -1:
            raise Exception('Invalid header')
        
        response_type = data[4]
        
        if response_type == 0x41:
            challenge = data[5:9]
            real_request = b'\xFF\xFF\xFF\xFF\x54\x53\x6F\x75\x72\x63\x65\x20\x45\x6E\x67\x69\x6E\x65\x20\x51\x75\x65\x72\x79\x00' + challenge
            sock.sendto(real_request, (host, port))
            data, _ = sock.recvfrom(4096)
            response_type = data[4]
        
        if response_type == 0x49:
            offset = 6
            server_name = read_string(data, offset)
            offset += len(server_name.encode('utf-8', errors='ignore')) + 1
            
            map_name = read_string(data, offset)
            offset += len(map_name.encode('utf-8', errors='ignore')) + 1
            
            folder = read_string(data, offset)
            offset += len(folder.encode('utf-8', errors='ignore')) + 1
            
            game = read_string(data, offset)
            offset += len(game.encode('utf-8', errors='ignore')) + 1
            
            offset += 2
            
            players = struct.unpack_from('B', data, offset)[0]
            offset += 1
            
            max_players = struct.unpack_from('B', data, offset)[0]
            
            return {
                'online': True,
                'players': players,
                'max_players': max_players,
                'server_name': server_name,
                'map': map_name
            }
        else:
            raise Exception(f'Invalid response type: {hex(response_type)}')
            
    finally:
        sock.close()


def read_string(data: bytes, offset: int) -> str:
    """Читает null-terminated строку из байтов"""
    end = data.find(b'\x00', offset)
    if end == -1:
        return ''
    return data[offset:end].decode('utf-8', errors='ignore')