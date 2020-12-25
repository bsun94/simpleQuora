import requests
import json

class awsHelper:
    # Replace with the info of your own AWS Elasticsearch instance
    HOST = "https://search-simplequora-6h3qxmhww5y2w6coxegz7q4tki.us-east-2.es.amazonaws.com/"
    DOMAIN = "simplequora/"
    
    # Where my personals creds are stored and gitignored; store yours in the ./simpleQuora/empty_AWS_ES_creds.json file provided and link to there (refer to AWS_ES_setup in ../simpleQuora)
    CREDS_FILE = './quoraBase/views/credentials.json'

    def __init__(self):
        with open(self.CREDS_FILE) as f:
            creds = json.loads(f.read())
            self.username = creds["user"]
            self.password = creds["password"]

    def getter(self, query):
        url_query = '+'.join(query.strip().split())
        url = self.HOST + self.DOMAIN + f"_search?q={url_query}&pretty=true&filter_path=_shards,hits.hits._id"

        r = requests.get(url, auth=(self.username, self.password))

        return r.json()
    
    def poster(self, body):
        payload = {"text": body["text"], "author": body["author"]}
        url = self.HOST + self.DOMAIN + f"_doc/{body['id']}"

        r = requests.put(url, auth=(self.username, self.password), json=payload, headers={'Content-Type': 'application/json'})
        return r.json()
