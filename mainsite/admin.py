from django.contrib import admin

from mainsite.models import Post

class AdminPost(admin.ModelAdmin):
    pass

admin.site.register(Post, AdminPost)
