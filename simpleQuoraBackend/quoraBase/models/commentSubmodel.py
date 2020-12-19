from django.db import models
from .answerSubmodel import Answers

class Comments(models.Model):

    id = models.AutoField(primary_key=True)
    text = models.TextField()
    author = models.CharField(max_length=50)
    creation_time = models.DateTimeField(auto_now_add=True)
    answer = models.ForeignKey(Answers, on_delete=models.CASCADE)
    replyto = models.ForeignKey('self', on_delete=models.CASCADE)

    def __str__(self):
        return self.author + ' commented: ' + self.text
