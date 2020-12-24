from django.urls import path

from . import views

urlpatterns = [
    path('questions/', views.questions, name='questions'),
    path('answers/', views.answers, name='answers'),
    path('comments/', views.comments, name='comments'),
    path('users/', views.users, name='users'),
    path('hasvoted/', views.hasvoted, name='hasvoted')
]