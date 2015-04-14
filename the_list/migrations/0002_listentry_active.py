# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('the_list', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='listentry',
            name='active',
            field=models.BooleanField(default=False),
        ),
    ]
