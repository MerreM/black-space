from django.contrib import admin

from civ_5_tracker.models import Player
from civ_5_tracker.models import Game
from civ_5_tracker.models import Victor
from civ_5_tracker.models import Participant
from civ_5_tracker.models import BattleReport

# Register your models here.

class ParticipationInline(admin.TabularInline):
    model = Participant
    extra = 2 # how many rows to show

class VictorInline(admin.TabularInline):
    model = Victor
    extra = 0 # how many rows to show

class GameAdmin(admin.ModelAdmin):
    inlines = (ParticipationInline,VictorInline,)

admin.site.register(Game, GameAdmin)
admin.site.register(Player)
admin.site.register(Victor)
admin.site.register(Participant)
admin.site.register(BattleReport)