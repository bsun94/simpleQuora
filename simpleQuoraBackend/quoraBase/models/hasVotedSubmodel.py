from django.db import models
from .questionSubmodel import Questions
from .answerSubmodel import Answers
from .userSubmodel import Users

class HasVoted(models.Model):

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, to_field="id", related_name="hasvoted_user", on_delete=models.CASCADE)
    username = models.ForeignKey(Users, to_field="username", related_name="hasvoted_username", on_delete=models.CASCADE)
    question = models.ForeignKey(Questions, null=True, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answers, null=True, on_delete=models.CASCADE)
    vote_type = models.CharField(max_length=10)

    def __str__(self):
        return self.username + str(self.question) + str(self.answer)
    
    class Meta:
        db_table = 'hasVoted'
