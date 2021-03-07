from django.test import TestCase
from django.urls import reverse

from quoraBase.models import Users

# Create your tests here.
class UsersViewTestCase(TestCase):
    def setUp(self):
        # fictitious examples - the app hashes user passwords in reality
        Users.objects.create(username='bsun', password='bsun')
        Users.objects.create(username='rjerling', password='rjerling')
    
    def test_get_user(self):
        response = self.client.get(reverse('users'), {'username': "bsun"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()[0]['password'], 'bsun')
        
        response = self.client.get(reverse('users'), {'username': "barackobama"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['Error'], 'Invalid username input')
    
    def test_post_users(self):
        response = self.client.post(reverse('users'), {'username': "ddrogba", 'password': "ddrogba"})
        self.assertEqual(response.status_code, 201)

        response = self.client.post(reverse('users'), {'password': "ddrogba"})
        self.assertEqual(response.status_code, 400)

        response = self.client.post(reverse('users'), {'username': "ddrogba"})
        self.assertEqual(response.status_code, 400)
    
    def test_patch_users(self):
        user_id = Users.objects.get(username="bsun").id
        response = self.client.patch(reverse('users'), {'id': user_id, 'username': "briansun"}, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.patch(reverse('users'), {'id': user_id, 'password': "briansun"}, content_type="application/json")
        self.assertEqual(response.status_code, 200)

        response = self.client.patch(reverse('users'), {'password': "briansun"}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
    
    def test_delete_users(self):
        user_id = Users.objects.get(username="rjerling").id
        response = self.client.delete(reverse('users'), {'id': user_id}, content_type="application/json")
        self.assertEqual(response.status_code, 202)

        response = self.client.delete(reverse('users'), {}, content_type="application/json")
        self.assertEqual(response.status_code, 404)

        response = self.client.delete(reverse('users'), {'id': 'user_id'}, content_type="application/json")
        self.assertEqual(response.status_code, 404)
