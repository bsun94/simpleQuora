from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Answers
from ..serializers import getAnswers

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
def answers(request):

    if request.method == 'GET':
        return get(request)

    elif request.method == "POST":
        return post(request)
    
    elif request.method == 'DELETE':
        return delete(request)

    elif request.method == 'PATCH':
        return patch(request)

def get(request):
    id = request.GET.get("id")
    question_id = request.GET.get("question_id")

    if id:
        try:
            answerQuery = Answers.objects.filter(pk=id)
        except:
            return Response({"Error": "Missing or Invalid Answer ID"}, status=400)
    elif question_id:
        try:
            answerQuery = Answers.objects.filter(question_id=question_id)
        except:
            return Response({"Error": "Missing or Invalid Question ID"}, status=400)

    answerSerializer = getAnswers(answerQuery, many=True)
    return Response(answerSerializer.data)

def post(request):
    serializer = getAnswers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

def delete(request):
    id = request.data.get("id")
    if id:
        try:
            query = Answers.objects.get(pk=id)
            query.delete()
            return Response({"Success": "Record deleted"}, status=202)
        except:
            return Response({"Error": "Stated ID does not exist"}, status=404)

    return Response({"Error": "Invalid input for ID"}, status=404)

def patch(request):
    text = request.data.get("text")
    if not text:
        return Response({"Error": "Missing input for answer text"}, status=404)

    id = request.data.get("id")
    if id:
        try:
            Answers.objects.filter(pk=id).update(text=text)
            return Response({"Success": "Record updated"}, status=200)
        except:
            return Response({"Error": "Record failed to update"}, status=404)
