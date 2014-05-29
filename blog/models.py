from django.db import models
from django.contrib.auth.models import User

import markdown

class Catergory(models.Model):
    name = models.CharField(max_length=256)
    visible = models.BooleanField()
    parent = models.ForeignKey('self',blank=True,null=True)
    def __unicode__(self):
        return u'%s'%self.name

    class Meta:
        ordering = ["id"]


class Post(models.Model):
    author = models.ForeignKey(User)
    title = models.CharField(max_length=256)
    slug = models.SlugField()
    post = models.TextField()
    catergories = models.ManyToManyField(Catergory)
    published = models.BooleanField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def markdown_post(self):
        return markdown.markdown(self.post)

    def __unicode__(self):
        return u'%s by %s (%s)' %(self.title,self.author,self.created)

    class Meta:
        get_latest_by = 'created'

