from django.db import models

# Create your models here.


class Producto(models.Model):
    nombre = models.CharField(max_length=60)
    precio = models.IntegerField()
    tramite = models.IntegerField()
    notarial = models.BooleanField(default=False)
    # created_at = models.DateTimeField(auto_now_add=True)
    # modified_at = models.DateTimeField(auto_now=True)

class Entrega(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, blank=True, null=True)
    dias_habiles = models.IntegerField()
    hora_limite = models.IntegerField()
    entrega_pos_limite = models.IntegerField()
    entrega_pre_limite = models.IntegerField()


