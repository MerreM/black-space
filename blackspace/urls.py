from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()
from django.conf.urls.static import static
import blackspace.settings

urlpatterns = [
	url(r'^markdown/', include( 'django_markdown.urls')),
    url(r'^', include('mainsite.urls', namespace='mainsite')),
    url(r'^writing/', include('blog.urls', namespace='blog')),
    url(r'^games/', include('civ_5_tracker.urls', namespace='games')),
    url(r'^the-list/', include('the_list.urls', namespace='the_list')),
    # url(r'^blog/', include('blog.urls')),
    # url(r'^grappelli/', include('grappelli.urls')), # grappelli URLS
    url(r'^admin/', include(admin.site.urls)),
]

# if blackspace.settings.DEBUG:
#     # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
#     pass
