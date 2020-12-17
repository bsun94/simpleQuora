from rest_framework.decorators import api_view
from rest_framework.response import Response

from datetime import date, timedelta

from .models import Questions
from .serializers import getQuestions


# Create your views here.

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
def questions(request):
    if request.method == 'GET':
        if request.GET:
            id = request.GET.get("q_id")
            if id:
                query = Questions.objects.filter(pk=id)
            else:
                time = request.GET.get("q_creation_time")
                if time:
                    query = Questions.objects.filter(
                        q_creation_time__gte=date.today()-timedelta(days=int(time))
                        )
        else:
            query = Questions.objects.all()
        
        serializer = getQuestions(query, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = getQuestions(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    elif request.method == 'DELETE':
        id = request.data.get("q_id")
        if id:
            try:
                query = Questions.objects.get(pk=id)
                query.delete()
                return Response({"Success": "Record deleted"}, status=202)
            except:
                return Response({"Error": "Stated ID does not exist"}, status=404)

        return Response({"Error": "Invalid input for ID"}, status=404)

    elif request.method == 'PATCH':
        # Patching only done for voting
        try:
            vote = int(request.data.get("q_votes"))
        except:
            return Response({"Error": "Invalid input for votes"}, status=400)
        
        id = request.data.get("q_id")
        if id:
            try:
                query = Questions.objects.filter(pk=id).update(q_votes=vote)
                return Response({"Success": "Record updated"}, status=200)
            except:
                return Response({"Error": "Stated ID does not exist"}, status=400)
