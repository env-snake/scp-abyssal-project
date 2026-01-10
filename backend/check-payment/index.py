import json
import os
import hashlib
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    '''Проверка статуса платежа через Robokassa OpState API'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    raw_body = event.get('body', '{}')
    if not raw_body or raw_body == '':
        raw_body = '{}'
    
    try:
        body = json.loads(raw_body)
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON in request body'})
        }
    
    invoice_id = body.get('invoiceId')
    
    if not invoice_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'invoiceId is required'})
        }
    
    merchant_login = os.environ.get('ROBOKASSA_MERCHANT_LOGIN')
    password_2 = os.environ.get('ROBOKASSA_PASSWORD_2')
    
    if not merchant_login or not password_2:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Robokassa credentials not configured'})
        }
    
    signature_string = f"{merchant_login}:{invoice_id}:{password_2}"
    signature = hashlib.md5(signature_string.encode()).hexdigest()
    
    url = f"https://auth.robokassa.ru/Merchant/WebService/Service.asmx/OpStateExt?MerchantLogin={merchant_login}&InvoiceID={invoice_id}&Signature={signature}"
    
    try:
        with urllib.request.urlopen(url) as response:
            xml_response = response.read().decode('utf-8')
            
            if 'StateCode="100"' in xml_response:
                status = 'success'
            elif 'StateCode="50"' in xml_response or 'StateCode="60"' in xml_response:
                status = 'pending'
            elif 'StateCode="5"' in xml_response or 'StateCode="10"' in xml_response:
                status = 'failed'
            else:
                status = 'unknown'
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'invoiceId': invoice_id,
                    'status': status,
                    'rawResponse': xml_response
                })
            }
    
    except urllib.error.HTTPError as e:
        return {
            'statusCode': 502,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': f'Robokassa API error: {e.code}',
                'message': str(e)
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Internal server error',
                'message': str(e)
            })
        }