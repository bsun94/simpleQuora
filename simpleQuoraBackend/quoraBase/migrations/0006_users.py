# Generated by Django 3.1.4 on 2020-12-22 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quoraBase', '0005_auto_20201220_2119'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=50)),
                ('password', models.TextField()),
            ],
            options={
                'db_table': 'users',
            },
        ),
    ]
