# Generated by Django 4.1.3 on 2024-01-12 21:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cliente',
            name='telefono',
        ),
    ]