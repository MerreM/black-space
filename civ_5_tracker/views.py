from django.shortcuts import render
from django.shortcuts import get_object_or_404

from civ_5_tracker.models import Game
from civ_5_tracker.models import Player
from civ_5_tracker.models import Victor

# Create your views here.
def games(request):
    games = Game.objects.all()
    return render(request,"games.html",{"games":games})

def players(request):
    players = Player.objects.all()
    context = {
        "players":players,
    }
    return render(request,"players.html",context)

def player(request,player_name):
    player = get_object_or_404(Player,name=player_name)
    wins = player.victor_set.all()
    win_count = wins.count()
    games = player.participant_set.all()
    game_count = games.count()
    context = {
        "player":player,
        "wins":wins,
        "win_count":win_count,
        "game_count":game_count
    }
    return render(request,"player.html",context)


def victories(request):
    games = Game.objects.filter(victor__in=Victor.objects.all())
    players = Player.objects.all()
    return render(request,"victories.html",{"games":games})

