from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.db import connection

from ..models import Comments
from ..serializers import getComments

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
def comments(request):

    if request.method == 'GET':
        return get(request)

    elif request.method == "POST":
        return post(request)
    
    elif request.method == 'DELETE':
        return delete(request)

    elif request.method == 'PATCH':
        return patch(request)

def get(request):
    answer_id = request.GET.get("answer_id")

    try:
        with connection.cursor() as cursor:
            cursor.execute(
                'SELECT c1.id as id \
                , c1.text as text \
                , c1.author as author \
                , c1.creation_time as creation_time \
                , c1.answer_id as answer_id \
                , c1.replyto_id as replyto \
                , c2.text as originalText \
                , c2.author as originalAuthor \
                FROM comments as c1 LEFT JOIN comments as c2 ON c1.replyto_id = c2.id \
                WHERE c1.answer_id = %s \
                ORDER BY c1.creation_time ASC;',
                [answer_id])
            query = dictfetchall(cursor)  # see at the bottom
    except:
        return Response({"Error": "Missing or Invalid Answer ID"}, status=400)

    return Response(query)

def post(request):
    serializer = getComments(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

def delete(request):
    id = request.data.get("id")
    if id:
        try:
            query = Comments.objects.get(pk=id)
            query.delete()
            return Response({"Success": "Record deleted"}, status=202)
        except:
            return Response({"Error": "Stated ID does not exist"}, status=404)

    return Response({"Error": "Invalid input for ID"}, status=404)

def patch(request):
    # For future implementation on text
    pass

def dictfetchall(cursor):
    # To convert cursor results - from raw SQL - to dict for serialization
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
