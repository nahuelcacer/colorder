from django.db import models
from apps.producto.models import Producto
from apps.cliente.models import Cliente
# Create your models here.

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    factura = models.BooleanField(null=False)
    recibo = models.BooleanField(null=False)
    fecha = models.DateField(auto_now_add=True)
    tiempo = models.TimeField(auto_now_add=True)
    completado = models.BooleanField(default=False)
    def __str__(self):
        return str(self.fecha) + " / " + str(self.tiempo)


class OrderProduct(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='order_items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()