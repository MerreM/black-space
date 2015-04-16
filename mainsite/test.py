from django.test import TestCase
from django.test import Client


class URLTests(TestCase):
    def setUp(self):
        self.client = Client()

    def testMainSiteUrl(self):
        resp = self.client. get("/")
        self.assertEqual(resp.status_code,200)

    def testMainSiteUrlAbout(self):
        resp = self.client. get("/about_me/")
        self.assertEqual(resp.status_code,200)

    def testMainSiteUrlCanvas(self):
        resp = self.client. get("/canvas/")
        self.assertEqual(resp.status_code,200)

    def testMainSiteUrlLife(self):
        resp = self.client. get("/life/")
        self.assertEqual(resp.status_code,200)

    def testMainSiteUrlPart(self):
        resp = self.client. get("/particles/")
        self.assertEqual(resp.status_code,200)


