from django.db import models
from django.contrib.auth.models import User

import markdown

class Catergory(models.Model):
    name = models.CharField(max_length=256)
    visible = models.BooleanField(default=False)
    parent = models.ForeignKey('self',blank=True,null=True)
    def __unicode__(self):
        return u'%s'%self.name

    class Meta:
        ordering = ["id"]

class Tag(models.Model):
    tag = models.CharField(max_length=64)

    def __unicode__(self):
        return u"%s"%self.tag

class Post(models.Model):
    author = models.ForeignKey(User)
    title = models.CharField(max_length=256)
    slug = models.SlugField()
    post = models.TextField()
    priority = models.IntegerField(null=True)
    catergories = models.ManyToManyField(Catergory)
    tags = models.ManyToManyField(Tag,blank=True)
    published = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def public_catergories(self):
        return self.catergories.filter(visible=True)

    def markdown_post(self):
        return markdown.markdown(self.post)

    def __unicode__(self):
        return u'%s by %s (%s)' %(self.title,self.author,self.created)


    class Meta:
        get_latest_by = 'modified'


