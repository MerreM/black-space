from django.db import models
from blog.models import Post

class Player(models.Model):
    name = models.CharField(max_length=128)
    def __unicode__(self):
        return u"%s"%(self.name)

class Game(models.Model):
    players = models.ManyToManyField(Player,through="Participant",related_name="player")
    victor = models.ManyToManyField(Player,through="Victor",related_name="winner")
    speed = models.CharField(max_length=32,blank=True,null=True)
    map_type = models.CharField(max_length=64)
    size = models.CharField(max_length=64)
    ai_players = models.IntegerField()
    begun_date = models.DateTimeField(blank=True,null=True)
    finished_date = models.DateTimeField(blank=True,null=True)

    def __unicode__(self):
        return u"%s players on a %s %s map"%(self.players.all().count(), self.size, self.map_type)

    class Meta:
        get_latest_by = "finished_date"
        ordering = [ "begun_date","finished_date"]

class Victor(models.Model):
    person = models.ForeignKey(Player)
    game = models.ForeignKey(Game,related_name="won")
    circumstances = models.TextField()
    turn = models.IntegerField()
    def __unicode__(self):
        return u"%s on %s"%(self.person.name,self.game.finished_date)


class Participant(models.Model):
    person = models.ForeignKey(Player)
    game = models.ForeignKey(Game)
    civ = models.CharField(max_length=64)
    difficulty = models.CharField(max_length=64,blank=True)

    def __unicode__(self):
        return "%s playing %s" % (self.person.name,self.civ)

class BattleReport(Post):
    game = models.ForeignKey(Game)

    class Meta:
        get_latest_by = "created"
        ordering = ["created"]