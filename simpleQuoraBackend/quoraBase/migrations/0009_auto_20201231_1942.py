# Generated by Django 3.1.4 on 2021-01-01 00:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quoraBase', '0008_hasvoted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='answers',
            name='votes',
        ),
        migrations.RemoveField(
            model_name='questions',
            name='votes',
        ),
    ]
