import requests

response = requests.get('https://indiansignlanguage.org/again/')

print(response.status_code)