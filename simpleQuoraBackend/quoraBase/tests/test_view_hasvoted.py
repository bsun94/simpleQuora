from django.test import TestCase
from django.urls import reverse

from quoraBase.models import Questions, Answers, Users, HasVoted

# Create your tests here.
class HasVotedViewTestCase(TestCase):
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
    
    def test_get_user_has_voted(self):
        response = self.client.get(reverse('hasvoted'), {'user': 1, 'question': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['has_voted'], True)

        response = self.client.get(reverse('hasvoted'), {'user': 1, 'question': 3})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['has_voted'], False)

        response = self.client.get(reverse('hasvoted'), {'user': 1, 'answer': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['has_voted'], True)
        
        response = self.client.get(reverse('hasvoted'), {'user': 1, 'answer': 3})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['has_voted'], False)

        response = self.client.get(reverse('hasvoted'), {'user': 1})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Unspecified question/answer ID')
    
    def test_get_vote_count(self):
        response = self.client.get(reverse('hasvoted'), {'question': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], 2)
        
        response = self.client.get(reverse('hasvoted'), {'question': 2})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], -1)

        response = self.client.get(reverse('hasvoted'), {'answer': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], 1)
        
        response = self.client.get(reverse('hasvoted'), {'answer': 2})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], -2)

        response = self.client.get(reverse('hasvoted'), {})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Unspecified question/answer ID')
    
    def test_post_has_voted(self):
        response = self.client.post(reverse('hasvoted'), {'user': 1, 'username': 'bsun', 'question': 2, 'vote_type': 'up'})
        self.assertEqual(response.status_code, 201)

        response = self.client.get(reverse('hasvoted'), {'question': 2})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], 0)

        response = self.client.post(reverse('hasvoted'), {'user': 1, 'username': 'bsun', 'answer': 2, 'vote_type': 'down'})
        self.assertEqual(response.status_code, 201)

        response = self.client.get(reverse('hasvoted'), {'answer': 2})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], -3)

        response = self.client.post(reverse('hasvoted'), {'answer': 2, 'vote_type': 'down'})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('hasvoted'), {'user': 1, 'vote_type': 'down'})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('hasvoted'), {'user': 1, 'answer': 2})
        self.assertEqual(response.status_code, 400)
    
    def test_patch_has_voted(self):
        response = self.client.patch(reverse('hasvoted'), {'user': 1, 'question': 1, 'vote_type': 'down'}, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.get(reverse('hasvoted'), {'question': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], 0)

        response = self.client.patch(reverse('hasvoted'), {'user': 1, 'answer': 1, 'vote_type': 'down'}, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.get(reverse('hasvoted'), {'answer': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['votes'], -1)

        response = self.client.patch(reverse('hasvoted'), {'answer': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Missing user ID')

        response = self.client.patch(reverse('hasvoted'), {'user': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Unspecified question/answer ID')

        response = self.client.patch(reverse('hasvoted'), {'user': 14, 'answer': 1, 'vote_type': 'up'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Unrecognized user ID')

        response = self.client.patch(reverse('hasvoted'), {'user': 1, 'answer': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Invalid vote type (i.e. the question or answer looked-for) queried')
    
    def test_delete_has_voted(self):
        response = self.client.delete(reverse('hasvoted'), {"user": 1, 'question': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 202)

        response = self.client.delete(reverse('hasvoted'), {'user': 2, 'answer': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 202)

        response = self.client.delete(reverse('hasvoted'), {'answer': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Missing user ID')

        response = self.client.delete(reverse('hasvoted'), {'user': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Unspecified question/answer ID')

        response = self.client.delete(reverse('hasvoted'), {'user': 14, 'answer': 1}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Unrecognized user ID')
