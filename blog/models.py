from django.db import models
from django.contrib.auth.models import User


class Catergory(models.Model):
    name = models.CharField(max_length=256)
    visible = models.BooleanField()
    parent = models.ForeignKey('self',blank=True,null=True)


class Post(models.Model):
    author = models.ForeignKey(User)
    title = models.CharField(max_length=256)
    post = models.TextField()
    catergories = models.ManyToManyField(Catergory)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)


    def __unicode__(self):
        return u'%s by %s (%s)' %(self.title,self.author,self.created)

