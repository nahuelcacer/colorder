from django.db import models
from apps.producto.models import Producto,Entrega
from apps.cliente.models import Cliente
from datetime import datetime, timedelta
from apps.pedido.tools import sumar_dias_habiles, comparar_horas

# Create your models here.

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    factura = models.BooleanField(default=False)
    recibo = models.BooleanField(default=False)
    fecha = models.DateField(auto_now_add=True)
    tiempo = models.DateTimeField(auto_now_add=True, null=True)
    completado = models.BooleanField(default=False)
    orden = models.PositiveIntegerField(null=True)
    enPreparacion = models.BooleanField(default=False)

    def __str__(self):
        return str(self.fecha) + " / " + str(self.tiempo)



    def dateFormated(self):
        return self.fecha.strftime("%d/%m/%Y")


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



    

    def calcularEntrega(self):
        entrega = Entrega.objects.filter(producto__id=self.producto_id)
        tiempo = self.pedido.tiempo

        if len(entrega) > 1:
            entrega = comparar_horas(entrega, tiempo)

        # entrega = Entrega.objects.filter(producto__id=self.producto_id).first()

        if entrega.dias_habiles == 0:
            if tiempo.hour < entrega.hora_limite:
                entrega_final = tiempo.replace(hour=entrega.entrega_pre_limite, minute=0, second=0)
                # print(entrega_final)
            else:
                entrega_final = sumar_dias_habiles(tiempo,1)
                entrega_final = entrega_final.replace(hour=entrega.entrega_pos_limite, minute=0, second=0)
                # print(entrega_final)
        else:
            entrega_final = sumar_dias_habiles(tiempo,entrega.dias_habiles)
            entrega_final = entrega_final.replace(hour=entrega.entrega_pos_limite, minute=0, second=0)
            # print(entrega_final)

        return entrega_final

        