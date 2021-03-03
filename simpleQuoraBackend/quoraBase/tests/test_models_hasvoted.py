from django.test import TestCase
from quoraBase.models import Questions, Answers, Users, HasVoted

# Create your tests here.
class HasVotedTestCase(TestCase):
    def setUp(self):
        Questions.objects.create(id=1, text="Is this test working?", author="bsun")
        Questions.objects.create(id=2, text="Is a tomato a fruit?", author="rjerling")

        Answers.objects.create(id=1, text="This test is working", author="bsun", question_id=1)
        Answers.objects.create(id=2, text="Tomato is apparently a fruit", author="rjerling", question_id=2)

        Users.objects.create(id=1, username='bsun', password='bsun')
        Users.objects.create(id=2, username='rjerling', password='rjerling')
        Users.objects.create(id=3, username='ppatel', password='ppatel')

        HasVoted.objects.create(user_id=1, username_id='bsun', question_id=1, vote_type='up')
        HasVoted.objects.create(user_id=2, username_id='rjerling', question_id=1, vote_type='up')
        HasVoted.objects.create(user_id=3, username_id='ppatel', question_id=2, vote_type='down')
        HasVoted.objects.create(user_id=1, username_id='bsun', answer_id=1, vote_type='up')
        HasVoted.objects.create(user_id=2, username_id='rjerling', answer_id=2, vote_type='down')
        HasVoted.objects.create(user_id=3, username_id='ppatel', answer_id=2, vote_type='down')
    
    def test_vote_tallies(self):
        question_upvotes = HasVoted.objects.filter(question_id=1, vote_type='up').count()
        question_downvotes = HasVoted.objects.filter(question_id=2, vote_type='down').count()
        answer_upvotes = HasVoted.objects.filter(answer_id=1, vote_type='up').count()
        answer_downvotes = HasVoted.objects.filter(answer_id=2, vote_type='down').count()

        self.assertEqual(question_upvotes, 2)
        self.assertEqual(question_downvotes, 1)
        self.assertEqual(answer_upvotes, 1)
        self.assertEqual(answer_downvotes, 2)
