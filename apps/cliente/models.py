from django.db import models

# Create your models here.

class Cliente(models.Model):
    nombre = models.CharField(max_length=60)
    dni = models.CharField(max_length=11)
    escribano = models.BooleanField(default=False)
    # telefono = models.CharField(max_length=20, null=True, blank=True)
    
    def __str__(self):
        return self.nombre

    # class Meta:
    #    unique_together = [
    #     ['dni', 'nombre'],
    #     ]