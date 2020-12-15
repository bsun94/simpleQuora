from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core import serializers

from .models import Questions, Answers, Comments

import json

# Create your views here.
def questions(request):
    if request.method == 'GET':
        response = serializers.serialize('json', Questions.objects.all())
        return HttpResponse(response)
    elif request.method == "POST":
        d = request.POST
        with open('request.json', 'w') as f:
            json.dump(d, f)
        return HttpResponse(request.POST.dict())
