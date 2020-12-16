import requests
import json

# api = requests.post('http://127.0.0.1:8000/quoraBase/questions/', {
#     "q_text": "Where is China?",
#     "q_author": "ppatel"
# })

# api = requests.delete('http://127.0.0.1:8000/quoraBase/questions/', params={
#     "q_id": 4
# })

api = requests.get('http://127.0.0.1:8000/quoraBase/questions/', params={
    # "q_id": 1,
    "q_creation_time": 1
})

# api = requests.patch('http://127.0.0.1:8000/quoraBase/questions/', params={
#     "q_id": 1,
#     "q_votes": 2
# })

print(api.text)