from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import HasVoted
from ..serializers import getHasVoted

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
def hasvoted(request):

    if request.method == 'GET':
        if request.GET.get("user"):
            return get_user_has_voted(request)
        else:
            return get_count(request)

    elif request.method == "POST":
        return post(request)
    
    elif request.method == 'DELETE':
        return delete(request)

    elif request.method == 'PATCH':
        return patch(request)

def get_user_has_voted(request):
    user = request.GET.get("user")
    if not user:
        return Response({"Error": "Unspecified user ID"}, status=400)

    query = HasVoted.objects.filter(user=user)
    
    if request.GET.get("question"):
        content_id = request.GET.get("question")
        query = query.filter(question=content_id)
    elif request.GET.get("answer"):
        content_id = request.GET.get("answer")
        query = query.filter(answer=content_id)
    else:
        return Response({"Error": "Unspecified question/answer ID"}, status=400)
    
    if query.exists():
        has_voted = True
    else:
        has_voted = False

    return Response({"has_voted": has_voted}, status=200)

def get_count(request):
    if request.GET.get("question"):
        content_id = request.GET.get("question")
        query = HasVoted.objects.filter(question=content_id)
    elif request.GET.get("answer"):
        content_id = request.GET.get("answer")
        query = HasVoted.objects.filter(answer=content_id)
    else:
        return Response({"Error": "Unspecified question/answer ID"}, status=400)
    
    upvotes = query.filter(vote_type='up').count()
    downvotes = query.filter(vote_type='down').count()

    return Response({"votes": upvotes - downvotes}, status=200)

def post(request):
    if not request.data.get('question') and not request.data.get('answer'):
        return Response({"Error": "Unspecified question/answer ID"}, status=400)
        
    serializer = getHasVoted(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

def delete(request):
    user = request.data.get("user")
    if not user:
        return Response({"Error": "Missing user ID"}, status=404)

    query = HasVoted.objects.filter(user=user)

    if not query.exists():
        return Response({"Error": "Unrecognized user ID"}, status=404)
    
    if request.data.get("question"):
        content_id = request.data.get("question")
        query = query.filter(question=content_id)
    elif request.data.get("answer"):
        content_id = request.data.get("answer")
        query = query.filter(answer=content_id)
    else:
        return Response({"Error": "Unspecified question/answer ID"}, status=400)
    
    try:
        query.delete()
        return Response({"Success": "Record deleted"}, status=202)
    except:
        return Response({"Error": "Delete operation failed"}, status=500)

def patch(request):
    user = request.data.get("user")
    if not user:
        return Response({"Error": 'Missing user ID'}, status=404)

    query = HasVoted.objects.filter(user=user)

    if not query.exists():
        return Response({"Error": "Unrecognized user ID"}, status=404)
    
    if request.data.get("question"):
        content_id = request.data.get("question")
        query = query.filter(question=content_id)
    elif request.data.get("answer"):
        content_id = request.data.get("answer")
        query = query.filter(answer=content_id)
    else:
        return Response({"Error": "Unspecified question/answer ID"}, status=400)

    vote_type = request.data.get("vote_type")
    try:
        query.update(vote_type=vote_type)
        return Response({"Success": "Record updated"}, status=200)
    except:
        return Response({"Error": "Invalid vote type (i.e. the question or answer looked-for) queried"}, status=400)
