import requests
import json

class awsElasticsearchHelper:
    """
    A helper class to handle AWS Elasticsearch posts and gets. Object initialization takes three arguments:

        1) host - the https url to your AWS ES instance
        2) domain - the name of your AWS ES instance
        3) indices - the index (and any sub-indices) of your ES document
        4) creds_file - where your AWS ES credentials are stored
    """

    def __init__(self, host, domain, indices, creds_file):
        self.host = host
        self.domain = domain
        self.indices = indices

        with open(creds_file) as f:
            creds = json.loads(f.read())
            self.username = creds["user"]
            self.password = creds["password"]

    def getter(self, query):
        url_query = '+'.join(query.strip().split())
        url = self.host + self.domain + self.indices + f"_search?q={url_query}&pretty=true&sort=_score:desc&filter_path=_shards,hits.hits._id"

        r = requests.get(url, auth=(self.username, self.password))
        r_dict = r.json()

        if len(r_dict["hits"]) > 0:
            indices = [x["_id"] for x in r_dict["hits"]["hits"]]
        else:
            indices = []

        return indices
    
    def poster(self, body):
        payload = {"text": body["text"], "author": body["author"]}
        url = self.host + self.domain + self.indices + f"_doc/{body['id']}"

        r = requests.put(url, auth=(self.username, self.password), json=payload, headers={'Content-Type': 'application/json'})
        return r.json()
