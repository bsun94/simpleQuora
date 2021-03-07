from django.test import TestCase
from django.urls import reverse

from quoraBase.models import Answers, Comments

# Create your tests here.
class CommentsViewTestCase(TestCase):
    def setUp(self):
        Answers.objects.create(text="This test is working", author="bsun", question_id=1)

        Comments.objects.create(text="This test is working better than you thought!", author="ppatel", answer_id=1)
        Comments.objects.create(text="Is it really though?", author="rjerling", answer_id=1)
    
    def test_get_comments_by_answer_id(self):
        response = self.client.get(reverse('comments'), {'answer_id': 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['text'], 'This test is working better than you thought!')
        
        response = self.client.get(reverse('comments'), {'answer_id': 34})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Missing or Invalid Answer ID')
    
    def test_post_comments_no_reply(self):
        answer_id = Answers.objects.get(author='bsun').id
        response = self.client.post(reverse('comments'), {'text': "wagwan", 'author': "bsun", 'answer': answer_id})
        self.assertEqual(response.status_code, 201)

        response = self.client.post(reverse('comments'), {'text': "wagwan", 'author': "bsun"})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('comments'), {'author': "bsun", 'answer': answer_id})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('comments'), {'text': "wagwan", 'answer': answer_id})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('comments'), {'text': "wagwan", 'author': "bsun", 'answer': 'answer_id'})
        self.assertEqual(response.status_code, 400)
    
    def test_post_comments_with_reply(self):
        answer_id = Answers.objects.get(author='bsun').id
        comment_id = Comments.objects.get(text="This test is working better than you thought!").id
        response = self.client.post(reverse('comments'), {'text': "But is it though?", 'author': "rjerling", 'answer': answer_id, 'replyto': comment_id})
        self.assertEqual(response.status_code, 201)

        response = self.client.get(reverse('comments'), {'answer_id': answer_id})
        self.assertEqual(response.json()[0]['originaltext'], "This test is working better than you thought!")
        self.assertEqual(response.json()[0]['originalauthor'], "ppatel")
    
    def test_patch_comments(self):
        comment_id = Comments.objects.get(text="This test is working better than you thought!").id
        response = self.client.patch(reverse('comments'), {'text': "This test is working better than we thought!", 'id': comment_id}, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.patch(reverse('comments'), {'text': "This test is working better than we thought!"}, content_type="application/json")
        self.assertEqual(response.status_code, 404)

        response = self.client.patch(reverse('comments'), {'id': comment_id}, content_type="application/json")
        self.assertEqual(response.status_code, 404)

        response = self.client.patch(reverse('comments'), {'text': "This test is working better than we thought!", 'id': 'comment_id'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
    
    def test_delete_comments(self):
        comment_id = Comments.objects.get(text="Is it really though?").id
        response = self.client.delete(reverse('comments'), {'id': comment_id}, content_type="application/json")
        self.assertEqual(response.status_code, 202)

        response = self.client.delete(reverse('comments'), {'text': "This patch is also working"}, content_type="application/json")
        self.assertEqual(response.status_code, 404)

        response = self.client.delete(reverse('comments'), {'id': 'comment_id'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
