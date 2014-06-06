from django.contrib import admin

from blog.models import Catergory
from blog.models import Post

class PostAdmin(admin.ModelAdmin):
    list_display = ["title","author","published"]
    list_filter = ["catergories","published"]

admin.site.register(Post,PostAdmin)
admin.site.register(Catergory)
