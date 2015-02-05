# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0004_auto_20150205_1122'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='participation',
            name='game',
        ),
        migrations.RemoveField(
            model_name='participation',
            name='person',
        ),
        migrations.DeleteModel(
            name='Participation',
        ),
        migrations.RemoveField(
            model_name='victory',
            name='group',
        ),
        migrations.RemoveField(
            model_name='victory',
            name='person',
        ),
        migrations.DeleteModel(
            name='Victory',
        ),
        migrations.AlterField(
            model_name='participant',
            name='difficulty',
            field=models.CharField(max_length=64, blank=True),
        ),
    ]
