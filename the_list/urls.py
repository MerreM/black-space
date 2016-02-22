from the_list import views
from django.conf.urls import url

from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    url(r'^$', views.is_it_on_the_list, name='on_the_list'),
    url(r'^list/$', views.the_list, name='the_list'),
    url(r'^list/(?P<page>[\d]+)$', views.the_list, name='the_list_page'),
]
