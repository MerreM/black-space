from django.contrib import admin

from blog.models import Category
from blog.models import Post
from blog.models import Tag
from blog.models import Readit
from blog.models import Vote

class PostAdmin(admin.ModelAdmin):
    list_display = ["title","author","priority","published"]
    list_filter = ["catergories","published"]
    list_editable = ["priority"]

class ReaditAdmin(admin.ModelAdmin):
    list_display = ["user_id","percentage_read","created","modified"]
    list_filter = ["user_id","percentage_read"]

class VoteAdmin(admin.ModelAdmin):
    list_display = ["user_id","post","created"]
    list_filter = ["user_id","post","created"]

admin.site.register(Post,PostAdmin)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Readit,ReaditAdmin)
admin.site.register(Vote, VoteAdmin)
