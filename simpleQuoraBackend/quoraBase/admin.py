from django.contrib import admin

from .models import Questions, Answers, Comments, Users, HasVoted

# Register your models here.
admin.site.register(Questions)
admin.site.register(Answers)
admin.site.register(Comments)
admin.site.register(Users)
admin.site.register(HasVoted)
