from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .models import Questions, Answers, Comments

# Create your views here.
def questions(request):
    if request.method == 'GET':
        response = serializers.serialize('json', Questions.objects.all())
        return HttpResponse(response)
