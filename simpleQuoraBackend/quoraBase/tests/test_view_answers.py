from django.test import TestCase
from django.urls import reverse

from quoraBase.models import Questions, Answers

# Create your tests here.
class AnswersViewTestCase(TestCase):
    def setUp(self):
        Questions.objects.create(text="Is this test working?", author="bsun")

        Answers.objects.create(text="This test is working", author="bsun", question_id=1)
        Answers.objects.create(text="Tomato is apparently a fruit", author="rjerling", question_id=2)
    
    def test_get_answers_by_question_id(self):
        response = self.client.get(reverse('answers'), {'question_id': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['text'], 'This test is working')
        
        response = self.client.get(reverse('answers'), {'question_id': 3})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Missing or Invalid Question ID')
    
    def test_get_answers_by_answer_id(self):
        id = Answers.objects.get(text="This test is working").id
        response = self.client.get(reverse('answers'), {'id': id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['text'], 'This test is working')
        
        response = self.client.get(reverse('answers'), {'id': 34})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Missing or Invalid Answer ID')
    
    def test_get_answers_no_id(self):
        response = self.client.get(reverse('answers'))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'No Answer or Question ID found')
    
    def test_post_answers(self):
        question_id = Questions.objects.get(author='bsun').id
        response = self.client.post(reverse('answers'), {'text': "This test is also working", 'author': "bsun", 'question': question_id})
        self.assertEqual(response.status_code, 201)

        response = self.client.post(reverse('answers'), {'text': "This test is also working", 'author': "bsun"})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('answers'), {'author': "bsun", 'question': question_id})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('answers'), {'text': "This test is also working", 'question': question_id})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('answers'), {'text': "This test is also working", 'author': "bsun", 'question': 'question_id'})
        self.assertEqual(response.status_code, 400)
    
    def test_patch_answers(self):
        answer_id = Answers.objects.get(question_id=1).id
        response = self.client.patch(reverse('answers'), {'text': "This patch is also working", 'id': answer_id}, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.patch(reverse('answers'), {'text': "This patch is also working"}, content_type="application/json")
        self.assertEqual(response.status_code, 404)

        response = self.client.patch(reverse('answers'), {'id': answer_id}, content_type="application/json")
        self.assertEqual(response.status_code, 404)

        response = self.client.patch(reverse('answers'), {'text': "This patch is also working", 'id': 'answer_id'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
    
    def test_delete_answers(self):
        answer_id = Answers.objects.get(question_id=1).id
        response = self.client.delete(reverse('answers'), {'id': answer_id}, content_type="application/json")
        self.assertEqual(response.status_code, 202)

        response = self.client.delete(reverse('answers'), {'text': "This patch is also working"}, content_type="application/json")
        self.assertEqual(response.status_code, 404)

        response = self.client.delete(reverse('answers'), {'id': 'answer_id'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
