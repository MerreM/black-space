# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0007_victor_turn'),
    ]

    operations = [
        migrations.CreateModel(
            name='BattleReport',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('report', models.TextField()),
                ('published', models.BooleanField(default=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(to='civ_5_tracker.Player', null=True)),
                ('game', models.ForeignKey(to='civ_5_tracker.Game')),
            ],
            options={
                'ordering': ['created'],
                'get_latest_by': 'created',
            },
            bases=(models.Model,),
        ),
        migrations.AlterModelOptions(
            name='game',
            options={'ordering': ['begun_date', 'finished_date'], 'get_latest_by': 'finished_date'},
        ),
    ]
