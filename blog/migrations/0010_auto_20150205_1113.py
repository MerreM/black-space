# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_auto_20150127_1410'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='readit',
            unique_together=set([('user_id', 'post')]),
        ),
        migrations.AlterUniqueTogether(
            name='vote',
            unique_together=set([('user_id', 'post')]),
        ),
    ]
