from rest_framework import serializers
from .models import Pedido, OrderProduct
from apps.cliente.serializers import ClienteSerializer
from apps.producto.serializers import ProductoSerializer
from apps.producto.models import Producto

from apps.cliente.models import Cliente


class OrderProductSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()
    class Meta:
        model = OrderProduct
        fields = ('id','producto', 'cantidad')

    def create(self,validated_data):
        pr_data = validated_data.pop('producto')
        producto = Producto.objects.get(**pr_data)
        order = OrderProduct.objects.create(producto=producto,**validated_data)
        return order

class OrderSerializer(serializers.ModelSerializer):
    orderproduct = OrderProductSerializer(many=True)
    cliente = ClienteSerializer()
    class Meta:
        model = Pedido
        fields = ('id', 'cliente', 'factura', 'recibo', 'fecha', 'tiempo', 'completado', 'orderproduct', 'orden')
    
    def create(self,validated_data):
        cliente_data = validated_data.pop('cliente')
        orderproduct_data  = validated_data.pop('orderproduct')
        print(type(cliente_data))
        cliente = Cliente.objects.get(**cliente_data)
        pedido = Pedido.objects.create(cliente=cliente,**validated_data)
        pedido.generate_order_number()
        pedido.save()
        for orderproduct_item in orderproduct_data:
            pr_data = orderproduct_item.get('producto')
            producto = Producto.objects.get(**pr_data)
            orderproduct_item['producto'] = producto
            OrderProduct.objects.create(pedido=pedido, **orderproduct_item)
        return pedido
    