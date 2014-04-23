from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import settings

urlpatterns = patterns('',
    # Examples:
    url(r'^$', include('mainsite.urls',namespace="home")),
    # url(r'^$', 'black_space.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += patterns('',  
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT})
    )
