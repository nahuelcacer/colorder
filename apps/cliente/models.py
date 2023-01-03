from django.db import models

# Create your models here.

class Cliente(models.Model):
    nombre = models.CharField(max_length=60)
    dni = models.IntegerField(unique=True)
    escribano = models.BooleanField(default=False)
    def __str__(self):
        return self.nombre

    class Meta:
       unique_together = [
        ['dni', 'nombre'],
        ]