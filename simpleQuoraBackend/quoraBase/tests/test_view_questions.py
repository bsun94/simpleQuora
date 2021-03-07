from django.test import TestCase
from django.urls import reverse

from quoraBase.models import Questions

# Create your tests here.
class QuestionsViewTestCase(TestCase):
    def setUp(self):
        Questions.objects.create(text="Is this test working?", author="bsun")
        Questions.objects.create(text="Is a tomato a fruit?", author="rjerling")
    
    def test_get_questions_by_id(self):
        id = Questions.objects.get(text='Is this test working?').id
        response = self.client.get(reverse('questions'), {'id': id})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['text'], 'Is this test working?')
        
        response = self.client.get(reverse('questions'), {'id': 34})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [])
    
    def test_get_all_questions(self):
        response = self.client.get(reverse('questions'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
        
    def test_get_questions_with_creation_time(self):
        response = self.client.get(reverse('questions'), {'creation_time': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)
    
    def test_post_questions(self):
        response = self.client.post(reverse('questions'), {'text': "Is this test also working?", 'author': "bsun"})
        self.assertEqual(response.status_code, 201)

        response = self.client.post(reverse('questions'), {'author': "bsun"})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('questions'), {'text': "Is this test also working?"})
        self.assertEqual(response.status_code, 400)
    
    def test_patch_questions(self):
        id = Questions.objects.get(text='Is this test working?').id
        response = self.client.patch(reverse('questions'), {'text': "This patch is working, isn't it?", 'id': id}, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.patch(reverse('questions'), {'text': "This patch is working, isn't it?"}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Missing question ID')

        response = self.client.patch(reverse('questions'), {'id': id}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Missing input for question text')

        response = self.client.patch(reverse('questions'), {'text': "This patch is working, isn't it?", 'id': 'random'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Record failed to update')
    
    def test_delete_questions(self):
        id = Questions.objects.get(text='Is this test working?').id
        response = self.client.delete(reverse('questions'), {'id': id}, content_type="application/json")
        self.assertEqual(response.status_code, 202)

        response = self.client.delete(reverse('questions'), {'text': "This patch is also working"}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Invalid input for ID')

        response = self.client.delete(reverse('questions'), {'id': 'random'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json()['Error'], 'Stated ID does not exist')
