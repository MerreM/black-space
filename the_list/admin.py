from django.contrib import admin

from the_list.models import ListEntry

class ListEntryAdmin(admin.ModelAdmin):
    list_display = ('entry', 'active')

admin.site.register(ListEntry,ListEntryAdmin)

