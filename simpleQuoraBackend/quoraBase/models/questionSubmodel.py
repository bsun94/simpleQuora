from django.db import models

class Questions(models.Model):
    
    # Django will autoassign a primary key autofield if none is specified, but will be read-only
    id = models.AutoField(primary_key=True)
    text = models.TextField()
    author = models.CharField(max_length=50)    # Restrict usernames to be shorter
    creation_time = models.DateTimeField(auto_now_add=True)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.author + ' asked: ' + self.text
