# Generated by Django 5.0.6 on 2024-06-26 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='text',
            field=models.CharField(max_length=5000),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='description',
            field=models.CharField(max_length=1600),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='semesters',
            field=models.CharField(max_length=600),
        ),
    ]
