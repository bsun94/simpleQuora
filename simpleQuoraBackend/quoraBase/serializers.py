from rest_framework import serializers
from .models import Questions, Answers, Comments

class getQuestions(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['id', 'text', 'author', 'creation_time', 'votes']

class getAnswers(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = ['id', 'text', 'author', 'creation_time', 'votes', 'question']

class getComments(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
