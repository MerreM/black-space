# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20140911_1045'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'get_latest_by': 'modified'},
        ),
        migrations.AddField(
            model_name='post',
            name='priority',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
