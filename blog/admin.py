from django.contrib import admin

from blog.models import Catergory
from blog.models import Post
from blog.models import Tag

class PostAdmin(admin.ModelAdmin):
    list_display = ["title","author","published"]
    list_filter = ["catergories","published"]
    # list_editable = ["priority"]

admin.site.register(Post,PostAdmin)
admin.site.register(Tag)
admin.site.register(Catergory)
