from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('blog.views',
    url(r'^$', 'writing', name='writing'),
    url(r'^tags/(?P<tags>.+)/$', 'tags', name='tags'),
    url(r'^(?P<catergory>\w+)/$', 'catergory', name='catergory'),
    url(r'^(?P<catergory>\w+)/(?P<slug>[-\w]+)/$', 'post', name='post'),
    url(r'^(?P<catergory>\w+)/(?P<slug>[-\w]+)/(?P<percent>[\d]+)/$', 'read_post', name='read_post'),
    url(r'^(?P<catergory>\w+)/(?P<slug>[-\w]+)/not_bad/$', 'liked_post', name='liked_post'),
)
