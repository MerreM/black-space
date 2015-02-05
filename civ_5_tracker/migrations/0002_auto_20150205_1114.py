# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='begun_date',
            field=models.DateTimeField(null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='finished_date',
            field=models.DateTimeField(null=True, blank=True),
        ),
    ]
