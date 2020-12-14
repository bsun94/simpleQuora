from django.db import models

# Create your models here.

class Questions(models.Model):
    
    # Django will autoassign a primary key autofield if none is specified, but will be read-only
    q_id = models.AutoField(primary_key=True)
    q_text = models.TextField()
    q_author = models.CharField(max_length=50)    # Restrict usernames to be shorter
    q_creation_time = models.DateTimeField(auto_now_add=True)
    q_votes = models.IntegerField(default=0)

    def __str__(self):
        return self.q_author + ' asked: ' + self.q_text

class Answers(models.Model):

    a_id = models.AutoField(primary_key=True)
    a_text = models.TextField()
    a_author = models.CharField(max_length=50)
    a_creation_time = models.DateTimeField(auto_now_add=True)
    a_votes = models.IntegerField(default=0)
    a_ques = models.ForeignKey(Questions, on_delete=models.CASCADE)    # Django auto-adds "_id" to the back of foreign keys

    def __str__(self):
        return self.a_author + ' answered: ' + self.a_text

class Comments(models.Model):

    c_id = models.AutoField(primary_key=True)
    c_text = models.TextField()
    c_author = models.CharField(max_length=50)
    c_creation_time = models.DateTimeField(auto_now_add=True)
    c_ans = models.ForeignKey(Answers, on_delete=models.CASCADE)
    c_replyto = models.ForeignKey('self', on_delete=models.CASCADE)

    def __str__(self):
        return self.c_author + ' commented: ' + self.c_text
