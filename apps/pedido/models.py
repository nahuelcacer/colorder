from django.db import models
from apps.producto.models import Producto
from apps.cliente.models import Cliente
from datetime import datetime, timedelta
from django.utils import timezone
from apps.pedido.tools import calcutaDay
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



    def whatDayIs(self, tiempo):
        diadehoy = tiempo
        tramite = 1 if self.producto.tramite <= 24 else self.producto.tramite / 24

        i = 0
        diadehoy += timedelta(days=1)
        while i < tramite:

            print(f"FECHA: {diadehoy}  NUMERO DE DIA: {diadehoy.weekday()} TRAMITE: {tramite}")
            if diadehoy.weekday() < 5:
                diadehoy += timedelta(days=1)
            else:
                tramite += 1  # Increment tramite only on weekends
                diadehoy += timedelta(days=1)

            i += 1
        
        return diadehoy - timedelta(days=1)

    def timeToFinish(self):
        tiempo = self.pedido.tiempo
        tramite = self.producto.tramite

        # Definir el rango de horas laborales
        hora_inicio = 8
        hora_fin = 18

        # Sumar el tiempo estimado al tiempo actual
        tiempo_final_1 = tiempo + timedelta(hours=tramite)

        # Verificar si la hora estimada supera las 18 horas
        if tiempo_final_1.day != tiempo.day:
             # Ajustar el tiempo para el siguiente día
            tiempo_final = tiempo.replace(hour=hora_inicio + 2, minute=0, second=0)
            return self.whatDayIs(tiempo_final)
      
        elif tiempo_final_1.hour >= hora_fin:
            tiempo_final = tiempo_final_1.replace(hour=hora_inicio + 2, minute=0, second=0) 
            return tiempo_final
        else:
            return tiempo_final_1
        # Devolver el tiempo estimado de finalización ajustado
        