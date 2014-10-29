from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('mainsite.views',
    url(r'^$', 'home', name='home'),
    url(r'^about_me/$', 'about_me', name='about_me'),
    url(r'^canvas/$', 'canvas', name='canvas'),
    url(r'^life/$', 'life', name='life'),
)
