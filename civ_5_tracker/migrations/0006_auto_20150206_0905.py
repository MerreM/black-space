# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0005_auto_20150205_1128'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='game',
            options={'ordering': ['finished_date', 'begun_date'], 'get_latest_by': 'finished_date'},
        ),
        migrations.AddField(
            model_name='game',
            name='speed',
            field=models.CharField(max_length=32, null=True, blank=True),
            preserve_default=True,
        ),
    ]
