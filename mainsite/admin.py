from django.contrib import admin

from django_markdown.admin import MarkdownModelAdmin

from mainsite.models import Post

admin.site.register(Post, MarkdownModelAdmin)
