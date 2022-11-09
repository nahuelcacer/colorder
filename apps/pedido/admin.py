from django.contrib import admin
from apps.pedido.models import Pedido, OrderProduct
# Register your models here.

admin.site.register(Pedido)
admin.site.register(OrderProduct)