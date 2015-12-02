from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()
from the_list import views

urlpatterns = [
    url(r'^$', views.is_it_on_the_list, name='on_the_list'),
    url(r'^list/$', views.the_list, name='the_list'),
    url(r'^list/(?P<page>[\d]+)$', views.the_list, name='the_list_page'),
]
