from django.db import models
from .questionSubmodel import Questions

class Answers(models.Model):

    id = models.AutoField(primary_key=True)
    text = models.TextField()
    author = models.CharField(max_length=50)
    creation_time = models.DateTimeField(auto_now_add=True)
    votes = models.IntegerField(default=0)
    question = models.ForeignKey(Questions, on_delete=models.CASCADE)    # Django auto-adds "_id" to the back of foreign keys

    def __str__(self):
        return self.author + ' answered: ' + self.text
