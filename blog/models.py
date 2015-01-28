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
        get_latest_by = 'priority'

class Readit(models.Model):
    user_id = models.IPAddressField()
    post = models.ForeignKey(Post)
    percentage_read = models.DecimalField(max_digits=5, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return u'User from %s read %s%% of %s'%(self.user_id,self.percentage_read,self.post.title)

    class Meta:
        unique_together = (("user_id", "post"),)


class Vote(models.Model):
    user_id = models.IPAddressField()
    post = models.ForeignKey(Post)
    created = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return u'User from %s wants more'%(self.user_id)

    class Meta:
        unique_together = (("user_id", "post"),)


