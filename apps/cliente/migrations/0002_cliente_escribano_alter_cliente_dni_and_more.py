# Generated by Django 4.1.3 on 2023-01-03 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='escribano',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='cliente',
            name='dni',
            field=models.IntegerField(unique=True),
        ),
        migrations.AlterUniqueTogether(
            name='cliente',
            unique_together={('dni', 'nombre')},
        ),
    ]