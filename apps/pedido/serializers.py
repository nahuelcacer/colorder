from rest_framework import serializers
from .models import Pedido, OrderProduct


class PedidoSerializer(serializers.ModelSerializer):

    cliente_nombre = serializers.CharField(source='cliente.nombre')
    cliente_dni = serializers.CharField(source='cliente.identificacion')
    class Meta:
        model = Pedido
        fields = ('id', 'factura', 'recibo', 'fecha', 'tiempo', 'completado', 'cliente_nombre', 'cliente_dni')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = ('id', 'pedido' , 'producto' , 'cantidad')