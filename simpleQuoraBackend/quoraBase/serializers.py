from rest_framework import serializers
from .models import Questions

class getQuestions(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = ['q_id', 'q_text', 'q_author', 'q_creation_time', 'q_votes']
