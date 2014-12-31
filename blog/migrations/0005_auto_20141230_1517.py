# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_auto_20141031_1250'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'get_latest_by': 'priority'},
        ),
        migrations.AlterField(
            model_name='post',
            name='priority',
            field=models.IntegerField(null=True),
        ),
    ]
