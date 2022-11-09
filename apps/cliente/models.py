from django.db import models

# Create your models here.

class Cliente(models.Model):
    nombre = models.CharField(max_length=60)
    identificacion = models.CharField(max_length=10, primary_key=True)

    def __str__(self):
        return self.nombre
