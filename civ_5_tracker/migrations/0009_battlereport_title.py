# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0008_auto_20150216_1159'),
    ]

    operations = [
        migrations.AddField(
            model_name='battlereport',
            name='title',
            field=models.CharField(default='Blank', max_length=64),
            preserve_default=False,
        ),
    ]
