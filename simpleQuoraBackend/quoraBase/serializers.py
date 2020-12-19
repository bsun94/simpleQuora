from rest_framework import serializers
from .models import Questions

class getQuestions(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['id', 'text', 'author', 'creation_time', 'votes']
