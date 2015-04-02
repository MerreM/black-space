# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0011_merge'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='game',
            options={'ordering': ['begun_date', 'finished_date'], 'get_latest_by': 'finished_date'},
        ),
    ]
