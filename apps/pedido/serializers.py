from rest_framework import serializers
from .models import Pedido, OrderProduct


class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ('id', 'factura', 'recibo', 'fecha', 'tiempo', 'completado')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ('id', 'pedido' , 'producto' , 'cantidad')