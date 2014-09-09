from django.test import TestCase
from blog.models import Post
from blog.models import Catergory

# Create your tests here.
class BlogTestCase(TestCase):
    fixtures = ['blog']
    def setUp(self):
        pass
    def test_latest(self):
        xan = Post.objects.all().latest()
        self.assertEqual(xan.title,"Xan")

    def test_private(self):
        xan = Post.objects.filter(published=False).latest()
        self.assertEqual(xan.title,"xan-revis-1")

    def test_catergories(self):
        self.assertEqual(Catergory.objects.all().count(),4)

    def test_public_catergories(self):
        self.assertEqual(Catergory.objects.filter(visible=True).count(),3)


        
        