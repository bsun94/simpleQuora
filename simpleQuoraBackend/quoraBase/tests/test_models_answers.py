from django.test import TestCase
from quoraBase.models import Answers

# Create your tests here.
class AnswersTestCase(TestCase):
    def setUp(self):
        Answers.objects.create(text="This test is working", author="bsun", question_id=1)
        Answers.objects.create(text="Tomato is apparently a fruit", author="rjerling", question_id=2)
    
    def test_query_by_author(self):
        bsun = Answers.objects.get(author="bsun")
        rjerling = Answers.objects.get(author="rjerling")
        self.assertEqual(bsun.text, "This test is working")
        self.assertEqual(rjerling.text, "Tomato is apparently a fruit")
    
    def test_query_by_id(self):
        bsun_id = Answers.objects.get(author="bsun").id
        bsun = Answers.objects.get(pk=bsun_id)
        self.assertEqual(bsun.text, "This test is working")
    
    def test_author_name_length(self):
        """
        Check that the length limit on author names is correctly applied in database - frontend has corresponding check on usernames upon registration
        """
        self.assertRaises(
            Exception,
            Answers.objects.create,
            text="Is my username too long?", 
            author="supercalifragilisticexpealidocious_supercalifragilisticexpealidocious",
            question=1
        )

    def test_question_id(self):
        self.assertRaises(
            Exception,
            Answers.objects.create,
            text="Test for question id foreign key",
            author="bsun",
        )
