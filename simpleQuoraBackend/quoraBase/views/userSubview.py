from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Users
from ..serializers import getUsers

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
def users(request):

    if request.method == 'GET':
        return get(request)

    elif request.method == "POST":
        return post(request)
    
    elif request.method == 'DELETE':
        return delete(request)

    elif request.method == 'PATCH':
        return patch(request)

def get(request):
    username = request.GET.get("username")

    try:
        query = Users.objects.filter(username=username)
    except:
        return Response({"Error": "Invalid username input"}, status=400)

    serializer = getUsers(query, many=True)
    return Response(serializer.data, status=200)

def post(request):
    serializer = getUsers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

def delete(request):
    id = request.data.get("id")
    if id:
        try:
            query = Users.objects.get(pk=id)
            query.delete()
            return Response({"Success": "Record deleted"}, status=202)
        except:
            return Response({"Error": "Stated ID does not exist"}, status=404)

    return Response({"Error": "Invalid input for ID"}, status=404)

def patch(request):
    id = request.data.get("id")
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        if username:
            Users.objects.filter(pk=id).update(username=username)
        elif password:
            Users.objects.filter(pk=id).update(password=password)

        return Response({"Success": "Record updated"}, status=200)
    except:
        return Response({"Error": "Invalid user input"}, status=400)
