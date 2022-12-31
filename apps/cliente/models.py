from django.db import models

# Create your models here.

class Cliente(models.Model):
    nombre = models.CharField(max_length=60)
    dni = models.IntegerField()
    def __str__(self):
        return self.nombre
