from django.conf.urls import patterns, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('civ_5_tracker.views',
                       url(r'^$', 'games', name='games'),
                       url(r'^victories/$', 'victories', name='victories'),
                       url(r'^players/$', 'players', name='players'),
                       url(r'^player/(?P<player_name>\w+)/$',
                           'player', name='player'),
                       )
