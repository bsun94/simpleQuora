from rest_framework import serializers
from .models import Questions, Answers, Comments, Users, HasVoted

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

class getUsers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class getHasVoted(serializers.ModelSerializer):
    class Meta:
        model = HasVoted
        fields = '__all__'
