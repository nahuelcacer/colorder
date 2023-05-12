from django.db import models
from apps.pedido.models import Pedido
# Create your models here
class Steps(models.Model):
    step_number = models.SmallIntegerField()
    name = models.CharField(max_length=60)

class Sectors(models.Model):
    name = models.CharField(max_length=60)
    created_at = models.DateField(auto_now_add=True)
    step_id = models.ForeignKey(Steps, on_delete=models.CASCADE)
    
class OrderStatus(models.Model):
    sector_id = models.ForeignKey(Sectors, on_delete=models.CASCADE)
    pedido_id = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    tiempo = models.TimeField(auto_now_add=True, null=True)
    