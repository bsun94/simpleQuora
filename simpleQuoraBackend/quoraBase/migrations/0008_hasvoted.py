# Generated by Django 3.1.4 on 2020-12-24 03:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('quoraBase', '0007_auto_20201222_1429'),
    ]

    operations = [
        migrations.CreateModel(
            name='HasVoted',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('vote_type', models.CharField(max_length=10)),
                ('answer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quoraBase.answers')),
                ('question', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='quoraBase.questions')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hasvoted_user', to='quoraBase.users')),
                ('username', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hasvoted_username', to='quoraBase.users', to_field='username')),
            ],
            options={
                'db_table': 'hasVoted',
            },
        ),
    ]
