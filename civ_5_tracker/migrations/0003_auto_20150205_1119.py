# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('civ_5_tracker', '0002_auto_20150205_1114'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participation',
            old_name='group',
            new_name='game',
        ),
    ]
