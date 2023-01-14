from django.db import models
from apps.producto.models import Producto
from apps.cliente.models import Cliente
from datetime import datetime
# Create your models here.

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    factura = models.BooleanField(default=False)
    recibo = models.BooleanField(default=False)
    fecha = models.DateField(auto_now_add=True)
    tiempo = models.TimeField(auto_now_add=True)
    completado = models.BooleanField(default=False)
    orden = models.PositiveIntegerField(null=True)
    enPreparacion = models.BooleanField(default=False)

    def __str__(self):
        return str(self.fecha) + " / " + str(self.tiempo)

    def generate_order_number(self):
        last_order = Pedido.objects.latest('orden')
        if self.fecha == last_order.fecha:
            self.orden = last_order.orden + 1 
        else:
            self.orden = 0

class OrderProduct(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='orderproduct')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()