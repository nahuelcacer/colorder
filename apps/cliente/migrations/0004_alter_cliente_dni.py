# Generated by Django 4.1.3 on 2023-01-06 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0003_alter_cliente_unique_together_alter_cliente_dni'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='dni',
            field=models.IntegerField(unique=True),
        ),
    ]
