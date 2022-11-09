from django.db import models
from apps.producto.models import Producto
# Create your models here.

class Pedido(models.Model):
    factura = models.BooleanField(null=True)
    recibo = models.BooleanField(null=True)
    fecha = models.DateField(auto_now_add=True)
    tiempo = models.TimeField(auto_now_add=True)
    completado = models.BooleanField(default=False)
    def __str__(self):
        return str(self.fecha) + " / " + str(self.tiempo)


class OrderProduct(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()