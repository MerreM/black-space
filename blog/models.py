from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import pre_save
from django.dispatch import receiver
import markdown
from django_markdown.models import MarkdownField


class Category(models.Model):
    name = models.CharField(max_length=256)
    visible = models.BooleanField(default=False)
    parent = models.ForeignKey('self', blank=True, null=True)

    def __str__(self):
        return u'%s' % self.name

    class Meta:
        ordering = ["id"]


class Tag(models.Model):
    tag = models.CharField(max_length=64)

    def __str__(self):
        return u"%s" % self.tag


class Post(models.Model):
    author = models.ForeignKey(User)
    title = models.CharField(max_length=256)
    slug = models.SlugField()
    post = MarkdownField()
    priority = models.IntegerField(null=True)
    catergories = models.ManyToManyField(Category)
    tags = models.ManyToManyField(Tag, blank=True)
    published = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def public_catergories(self):
        return self.catergories.filter(visible=True)

    def markdown_post(self):
        return markdown.markdown(self.post)

    def __str__(self):
        return u'%s by %s (%s)' % (self.title, self.author, self.created)

    class Meta:
        get_latest_by = 'created'


class Readit(models.Model):
    user_id = models.GenericIPAddressField()
    post = models.ForeignKey(Post)
    percentage_read = models.DecimalField(max_digits=5, decimal_places=2)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return u'User from {} read {}%% of {}'.format(
            self.user_id, self.percentage_read, self.post.title)

    class Meta:
        unique_together = (("user_id", "post"),)


class Vote(models.Model):
    user_id = models.GenericIPAddressField()
    post = models.ForeignKey(Post)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return u'User from %s wants more' % (self.user_id)

    class Meta:
        unique_together = (("user_id", "post"),)


@receiver(pre_save, sender=Post)
def my_handler(sender, **kwargs):
    pass
