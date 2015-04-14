from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('the_list.views',
    url(r'^$', 'is_it_on_the_list', name='on_the_list'),
    url(r'^list/$', 'the_list', name='the_list'),
    url(r'^list/(?P<page>[\d]+)$', 'the_list', name='the_list_page'),
)
