# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('map_type', models.CharField(max_length=64)),
                ('size', models.CharField(max_length=64)),
                ('ai_players', models.IntegerField()),
                ('begun_date', models.DateTimeField(blank=True)),
                ('finished_date', models.DateTimeField(blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Participation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('civ', models.CharField(max_length=64)),
                ('difficulty', models.CharField(max_length=64)),
                ('group', models.ForeignKey(to='civ_5_tracker.Game')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=128)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Victory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('circumstances', models.TextField()),
                ('group', models.ForeignKey(to='civ_5_tracker.Game')),
                ('person', models.ForeignKey(to='civ_5_tracker.Player')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='participation',
            name='person',
            field=models.ForeignKey(to='civ_5_tracker.Player'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='game',
            name='players',
            field=models.ManyToManyField(to='civ_5_tracker.Player', through='civ_5_tracker.Participation'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='game',
            name='victor',
            field=models.ManyToManyField(related_name=b'victors', through='civ_5_tracker.Victory', to='civ_5_tracker.Player'),
            preserve_default=True,
        ),
    ]
