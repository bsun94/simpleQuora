from rest_framework import serializers
from .models import Questions, Answers, Comments, Users, HasVoted

class getQuestions(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'

class getAnswers(serializers.ModelSerializer):
    class Meta:
        model = Answers
        fields = '__all__'

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
