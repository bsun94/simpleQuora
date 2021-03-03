from django.test import TestCase
from quoraBase.models import Users

# Create your tests here.
class UsersTestCase(TestCase):
    def setUp(self):
        # fictitious examples - the app hashes user passwords in reality
        Users.objects.create(username='bsun', password='bsun')
        Users.objects.create(username='rjerling', password='rjerling')
    
    def test_query_by_author(self):
        bsun = Users.objects.get(username="bsun")
        rjerling = Users.objects.get(username="rjerling")
        self.assertEqual(bsun.username, "bsun")
        self.assertEqual(rjerling.username, "rjerling")
    
    def test_query_by_id(self):
        bsun_id = Users.objects.get(username="bsun").id
        bsun = Users.objects.get(pk=bsun_id)
        self.assertEqual(bsun.username, "bsun")
    
    def test_author_name_length(self):
        """
        Check that the length limit on author names is correctly applied in database - frontend has corresponding check on usernames upon registration
        """
        self.assertRaises(
            Exception,
            Users.objects.create,
            text="Is my username too long?", 
            author="supercalifragilisticexpealidocious_supercalifragilisticexpealidocious",
            question=1
        )
