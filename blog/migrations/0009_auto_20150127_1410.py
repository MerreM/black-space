# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_readit_vote'),
    ]

    operations = [
        migrations.AddField(
            model_name='readit',
            name='created',
            field=models.DateTimeField(default=datetime.date(2015, 1, 27), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='readit',
            name='modified',
            field=models.DateTimeField(default=datetime.date(2015, 1, 27), auto_now=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='vote',
            name='created',
            field=models.DateTimeField(default=datetime.date(2015, 1, 27), auto_now_add=True),
            preserve_default=False,
        ),
    ]
