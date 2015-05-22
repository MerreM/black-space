from django.db import models


class ListEntry(models.Model):
    entry = models.TextField()
    active = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    def __unicode__(self):
        return u'%s'%self.entry.title()
    class Meta:
        ordering = ["id"]