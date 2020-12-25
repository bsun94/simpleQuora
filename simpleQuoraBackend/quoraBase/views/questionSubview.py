from rest_framework.decorators import api_view
from rest_framework.response import Response

from datetime import date, timedelta

from ..models import Questions
from ..serializers import getQuestions

from .awsHelper import awsHelper

aws = awsHelper()

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
def questions(request):

    if request.method == 'GET':
        return get(request)

    elif request.method == "POST":
        return post(request)
    
    elif request.method == 'DELETE':
        return delete(request)

    elif request.method == 'PATCH':
        return patch(request)

def get(request):
    if request.GET:
        id = request.GET.get("id")
        if id:
            query = Questions.objects.filter(pk=id)
        else:
            search = request.GET.get("search")
            time = request.GET.get("creation_time")

            if search:
                resp = aws.getter(search)
                if resp.get("hits"):
                    indices = [x["_id"] for x in resp["hits"]["hits"]]
                else:
                    indices = []

                query = Questions.objects.filter(id__in=indices).order_by('-creation_time')

                if time:
                    query = query.filter(
                        q_creation_time__gte=date.today()-timedelta(days=int(time))
                    )
            elif time:
                query = Questions.objects.filter(
                        q_creation_time__gte=date.today()-timedelta(days=int(time))
                    ).order_by('-creation_time')
                
    else:
        query = Questions.objects.all().order_by('-creation_time')
    
    serializer = getQuestions(query, many=True)
    return Response(serializer.data)

def post(request):
    serializer = getQuestions(data=request.data)
    if serializer.is_valid():
        serializer.save()
        resp = aws.poster(serializer.data)

        if resp["_shards"]["successful"] == 1:
            return Response(serializer.data, status=201)
        else:
            return Response({"Error": "Upload to AWS Elasticsearch has failed"}, status=500)
    
    return Response(serializer.errors, status=400)

def delete(request):
    id = request.data.get("id")
    if id:
        try:
            query = Questions.objects.get(pk=id)
            query.delete()
            return Response({"Success": "Record deleted"}, status=202)
        except:
            return Response({"Error": "Stated ID does not exist"}, status=404)

    return Response({"Error": "Invalid input for ID"}, status=404)

def patch(request):
    # Patching only done for voting
    try:
        vote = int(request.data.get("votes"))
    except:
        return Response({"Error": "Invalid input for votes"}, status=400)
    
    id = request.data.get("id")
    if id:
        try:
            Questions.objects.filter(pk=id).update(votes=vote)
            return Response({"Success": "Record updated"}, status=200)
        except:
            return Response({"Error": "Stated ID does not exist"}, status=400)
