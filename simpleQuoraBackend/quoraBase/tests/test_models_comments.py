from django.test import TestCase
from quoraBase.models import Comments

# Create your tests here.
class CommentsTestCase(TestCase):
    def setUp(self):
        Comments.objects.create(text="This test is working, but the weather...", author="bsun", answer_id=1)
        Comments.objects.create(text="Tomato is apparently a fruit, but avocados - that's going too far!", author="rjerling", answer_id=2)
    
    def test_query_by_author(self):
        bsun = Comments.objects.get(author="bsun")
        rjerling = Comments.objects.get(author="rjerling")
        self.assertEqual(bsun.text, "This test is working, but the weather...")
        self.assertEqual(rjerling.text, "Tomato is apparently a fruit, but avocados - that's going too far!")
    
    def test_query_by_id(self):
        bsun_id = Comments.objects.get(author="bsun").id
        bsun = Comments.objects.get(pk=bsun_id)
        self.assertEqual(bsun.text, "This test is working, but the weather...")
    
    def test_author_name_length(self):
        """
        Check that the length limit on author names is correctly applied in database - frontend has corresponding check on usernames upon registration
        """
        self.assertRaises(
            Exception,
            Comments.objects.create,
            text="Is my username too long?", 
            author="supercalifragilisticexpealidocious_supercalifragilisticexpealidocious",
            question=1
        )

    def test_answer_id(self):
        self.assertRaises(
            Exception,
            Comments.objects.create,
            text="Test for answer id foreign key",
            author="bsun",
        )
