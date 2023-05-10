from django.db import models

# Create your models here.


class Producto(models.Model):
    nombre = models.CharField(max_length=60)
    precio = models.IntegerField()
    tramite = models.IntegerField()
    notarial = models.BooleanField(default=False)
    
    class Meta:
        app_label = 'producto'
    def __str__(self):
        return self.nombre