import requests
import json

class initializeElasticSearch:
    """
    This class is to help users set up their AWS Elasticsearch instance for the first time (if you'd previously stored data in your Django DB without upload to AWS ES).
    
    For further support, relevant documentation can be found at:

    https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-gsg.html
    https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-indexing.html
    https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/es-request-signing.html#es-request-signing-python

    Follow the instructions in the first link to set up an instance (this is based on a test instance, although you can eventually move on to a full deployment version from here).
    Take note of the master user and associated password you've set in the process - it'll be needed to access the instance later. As for domain name, set it to "simplequora"
    for the purposes of this app, and on AWS ES, set the access policy to be open to all for now (although you can specify AWS users later on).
    """

    LOCAL_SERVER = ''  # Set this based on your Django urls configurations e.g. 'http://127.0.0.1:8000/quoraBase/questions/'
    HOST = ''          # Set this based on your AWS ES info (displayed on main console page) e.g. 'https://search-domainName-xxxxxxxxxxxxxxxxxxxx.aws-region-##.es.amazonaws.com/'
    CREDS = './simpleQuoraBackend/simpleQuora/empty_AWS_ES_creds.json'    # Store the *master* username and password you've set above in here under appropriate keys
    DATA_JSON = ''    # For the option below of writing to AWS ES from a data file you'd written up

    def __init__(self):
        self.api = requests.get(self.LOCAL_SERVER)

        with open(self.CREDS) as f:
            creds = json.loads(f.read())
            self.username = creds['user']
            self.password = creds['password']

    def AWS_ES_helper(self, path, payload):
        """
        To serve the below methods
        """

        url = self.HOST + path
        r = requests.put(url, auth=(self.username, self.password), json=payload, headers={'Content-Type': 'application/json'})
        print(r.text)
    
    def getFromDB(self):
        """
        Reads pre-stored questions in the Django DB and sends them one by one to AWS ES. The AWS ES _doc endpoint is used here instead of _bulk (for mass upload) due to unclear 
        data formatting specifications for the _bulk endpoint in AWS ES's documentation.
        """

        for entry in self.api.json():
            path = "simplequora/_doc/" + str(entry["id"])
            payload = {"text": entry["text"],"author": entry["author"]}

            self.AWS_ES_helper(path, payload)
    
    def getFromFile(self):
        """
        Alternatively, should you have written your data into a JSON file and intend to upload from there to AWS ES, use this method.
        Recommended format for the file should be that it contains a dictionary on each line, with each dictionary containing data:
            {"id": "some_id", "text": "some_text", "author": "some_author"}
        """

        with open(self.DATA_JSON) as f:
            lines = f.readlines()
        
        for entry in lines:
            dic = json.loads(entry)
            path = "simplequora/_doc/" + dic["id"]
            payload = {"text": dic["text"],"author": dic["author"]}

            self.AWS_ES_helper(path, payload)


# initializer = initializeElasticSearch()
# initializer.getFromDB()
# initializer.getFromFile()
