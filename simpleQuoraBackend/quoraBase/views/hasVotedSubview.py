from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import HasVoted
from ..serializers import getHasVoted

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
def hasvoted(request):

    if request.method == 'GET':
        return get(request)

    elif request.method == "POST":
        return post(request)
    
    elif request.method == 'DELETE':
        return delete(request)

    elif request.method == 'PATCH':
        return patch(request)

def get(request):
    user_id = request.GET.get("user_id")
    query = HasVoted.objects.filter(user=user_id)

    if not query.exists():
        return Response({"Error": "Invalid input for ID"}, status=404)
    
    if request.GET.get("question"):
        content_id = request.GET.get("question")
        query = query.filter(question=content_id)
    elif request.GET.get("answer"):
        content_id = request.GET.get("answer")
        query = query.filter(answer=content_id)
    
    if not query.exists():
        return Response({"Error": "Requested entry not found"}, status=400)

    serializer = getHasVoted(query, many=True)
    return Response(serializer.data, status=200)

def post(request):
    serializer = getHasVoted(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

def delete(request):
    user_id = request.GET.get("user_id")
    query = HasVoted.objects.filter(user=user_id)

    if not query.exists():
        return Response({"Error": "Invalid input for ID"}, status=404)
    
    if request.GET.get("question"):
        content_id = request.GET.get("question")
        query = query.filter(question=content_id)
    elif request.GET.get("answer"):
        content_id = request.GET.get("answer")
        query = query.filter(answer=content_id)
    
    try:
        query.delete()
        return Response({"Success": "Record deleted"}, status=202)
    except:
        return Response({"Error": "Stated ID does not exist"}, status=404)

def patch(request):
    user_id = request.data.get("user_id")
    query = HasVoted.objects.filter(user=user_id)

    if not query.exists():
        return Response({"Error": "Invalid input for ID"}, status=404)
    
    if request.GET.get("question"):
        content_id = request.GET.get("question")
        query = query.filter(question=content_id)
    elif request.GET.get("answer"):
        content_id = request.GET.get("answer")
        query = query.filter(answer=content_id)

    vote_type = request.data.get("vote_type")
    try:
        query.update(vote_type=vote_type)
        return Response({"Success": "Record updated"}, status=200)
    except:
        return Response({"Error": "Invalid content instance (i.e. the question or answer looked-for) queried"}, status=400)
