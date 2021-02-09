#!/usr/bin/python3

import requests
import re

REF_TOKEN = ''
API_URL = 'https://master.18112014.vercel.app'

new_client = {
    'active':       [None, True],
    'published':    [None, True],
    'ref':          [None, REF_TOKEN],
    'name':         ['Nome do negócio', 'Loja modelo'],
    'shortName':    ['Nome curto', 'modelo'],
    'phone':        ['WhatsApp do proprietário', '37999999999'],
    'email':        ['Endereço de e-mail do proprietário', 'exemplo@loja.com'],
    'instagram':    ['Usuário do instagram', 'instagram'],
    'logo':         ['Logomarca', 'https://via.placeholder.com/500x500'],
}

for key, [input_text, value] in new_client.items():
    new_val = input(f'{input_text}: ') if input_text else value
    new_client[key] = new_val if type(new_val) != str or len(new_val) > 0 else value

suggested_domain = re.sub('[^a-z0-9]', '', new_client['shortName'].lower())

domains = [ f'{suggested_domain}.lojou.app' ]
new_domains = input(f'\nNomes de dominio ({",".join(domains)}): ')
new_domains = re.sub('[ \s]*', '', new_domains)

new_client['domains'] = new_domains.split(',') if len(new_domains) > 0 else domains

try:
    response = requests.get(f'{API_URL}/api/configuration/client_create', json=new_client)
    result = response.json()

    print(result)
    
except:
    print('Erro!')
    print(response)