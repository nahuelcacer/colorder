from rest_framework import serializers
from .models import Pedido, OrderProduct




class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model =  OrderProduct
        fields = ('id', 'producto', 'cantidad')

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Pedido
        fields = ('id', 'factura', 'recibo', 'fecha', 'tiempo', 'completado', 'cliente', 'order_items')

