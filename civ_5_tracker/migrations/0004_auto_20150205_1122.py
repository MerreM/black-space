# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0003_auto_20150205_1119'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('civ', models.CharField(max_length=64)),
                ('difficulty', models.CharField(max_length=64)),
                ('game', models.ForeignKey(to='civ_5_tracker.Game')),
                ('person', models.ForeignKey(to='civ_5_tracker.Player')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Victor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('circumstances', models.TextField()),
                ('game', models.ForeignKey(related_name=b'won', to='civ_5_tracker.Game')),
                ('person', models.ForeignKey(to='civ_5_tracker.Player')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='game',
            name='players',
            field=models.ManyToManyField(related_name='player', through='civ_5_tracker.Participant', to='civ_5_tracker.Player'),
        ),
        migrations.AlterField(
            model_name='game',
            name='victor',
            field=models.ManyToManyField(related_name='winner', through='civ_5_tracker.Victor', to='civ_5_tracker.Player'),
        ),
    ]
