from django.test import TestCase
from django.test import Client


class BasicPageTestCase(TestCase):
    def setUp(self):
        self.client = Client()
        self.urls = ["/", "/about_me/", "/canvas/", "/life/"]

    def test_urls(self):
        for url in self.urls:
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)
