# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_auto_20141031_1337'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'get_latest_by': 'priority'},
        ),
    ]
