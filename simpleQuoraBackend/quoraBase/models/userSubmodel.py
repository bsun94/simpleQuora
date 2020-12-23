from django.db import models

class Users(models.Model):

    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.TextField()

    def __str__(self):
        return self.username
    
    class Meta:
        db_table = 'users'
