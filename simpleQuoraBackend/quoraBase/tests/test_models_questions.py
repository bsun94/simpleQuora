from django.test import TestCase
from quoraBase.models import Questions

# Create your tests here.
class QuestionsTestCase(TestCase):
    def setUp(self):
        Questions.objects.create(text="Is this test working?", author="bsun")
        Questions.objects.create(text="Is a tomato a fruit?", author="rjerling")
    
    def test_query_by_author(self):
        bsun = Questions.objects.get(author="bsun")
        rjerling = Questions.objects.get(author="rjerling")
        self.assertEqual(bsun.text, "Is this test working?")
        self.assertEqual(rjerling.text, "Is a tomato a fruit?")
    
    def test_query_by_id(self):
        bsun_id = Questions.objects.get(author="bsun").id
        bsun = Questions.objects.get(pk=bsun_id)
        self.assertEqual(bsun.text, "Is this test working?")
    
    def test_author_name_length(self):
        """
        Check that the length limit on author names is correctly applied in database - frontend has corresponding check on usernames upon registration
        """
        self.assertRaises(
            Exception,
            Questions.objects.create,
            text="Is my username too long?", 
            author="supercalifragilisticexpealidocious_supercalifragilisticexpealidocious"
        )
