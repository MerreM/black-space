# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0010_auto_20150205_1113'),
        ('civ_5_tracker', '0009_battlereport_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='battlereport',
            name='author',
        ),
        migrations.RemoveField(
            model_name='battlereport',
            name='created',
        ),
        migrations.RemoveField(
            model_name='battlereport',
            name='id',
        ),
        migrations.RemoveField(
            model_name='battlereport',
            name='modified',
        ),
        migrations.RemoveField(
            model_name='battlereport',
            name='published',
        ),
        migrations.RemoveField(
            model_name='battlereport',
            name='report',
        ),
        migrations.RemoveField(
            model_name='battlereport',
            name='title',
        ),
        migrations.AddField(
            model_name='battlereport',
            name='post_ptr',
            field=models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, default=-1, serialize=False, to='blog.Post'),
            preserve_default=False,
        ),
    ]
