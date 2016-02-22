from django.conf.urls import url

from django.contrib import admin

from blog import views
admin.autodiscover()

urlpatterns = [
    url(r'^$', views.writing, name='writing'),
    url(r'^tags/(?P<tags>.+)/$', views.tags, name='tags'),
    url(r'^search/$', views.search, name='search'),
    url(r'^(?P<category>\w+)/$', views.category, name='category'),
    url(r'^(?P<category>\w+)/(?P<slug>[-\w]+)/$', views.post, name='post'),
    url(r'^(?P<category>\w+)/(?P<slug>[-\w]+)/(?P<percent>[\d]+)/$',
        views.read_post, name='read_post'),
    url(r'^(?P<category>\w+)/(?P<slug>[-\w]+)/not_bad/$',
        views.liked_post, name='liked_post'),
]
