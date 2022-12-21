from rest_framework import serializers
from .models import Pedido, OrderProduct



class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model =  OrderProduct
        fields = ('id', 'producto', 'cantidad')


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    cliente_nombre = serializers.CharField(source='cliente.nombre')
    cliente_dni = serializers.CharField(source='cliente.identificacion')
    class Meta:
        model = Pedido
        fields = ('id', 'factura', 'recibo', 'fecha', 'tiempo', 'completado', 'cliente', 'order_items', 'cliente_nombre', 'cliente_dni')

