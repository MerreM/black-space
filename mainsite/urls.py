from django.conf.urls import patterns, include, url
from mainsite import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^about_me/$', views.about_me, name='about_me'),
    url(r'^canvas/$', views.canvas, name='canvas'),
    # url(r'^liquid/$', 'liquid', name='liquid'),
    url(r'^life/$', views.life, name='life'),
    url(r'^particles/$', views.particles, name='particles'),
]
