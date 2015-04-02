# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_auto_20150205_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='readit',
            name='user_id',
            field=models.GenericIPAddressField(),
        ),
        migrations.AlterField(
            model_name='vote',
            name='user_id',
            field=models.GenericIPAddressField(),
        ),
    ]
