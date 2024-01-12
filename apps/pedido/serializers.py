from rest_framework import serializers
from .models import Pedido, OrderProduct
from apps.cliente.serializers import ClienteSerializer
from apps.producto.serializers import ProductoSerializer
from apps.producto.models import Producto

from apps.cliente.models import Cliente


class OrderProductSerializer(serializers.ModelSerializer):
    # producto = ProductoSerializer()
    class Meta:
        model = OrderProduct
        fields = ('id','producto', 'cantidad')

    def to_representation(self, instance):
        data = super().to_representation(instance)
        #OBTENER DATOS DEL PRODUCTO#
        producto = instance.producto
        #SERIALIZAR PRODUCTO#
        productoSerlializado = ProductoSerializer(producto).data
        #AGREGAR A LA DATA#
        data['producto'] = productoSerlializado
        return data


    # def create(self,validated_data):
    #     pr_data = validated_data.pop('producto')
    #     producto = Producto.objects.get(**pr_data)
    #     order = OrderProduct.objects.create(producto=producto,**validated_data)
    #     return order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ('id', 'cliente', 'factura', 'recibo', 'fecha', 'tiempo', 'completado', 'orderproduct', 'orden', 'enPreparacion')
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        #instanciacion#
        cliente = instance.cliente
        orderproduct = instance.orderproduct.all()
        #serializacion#
        cliente_serializado = ClienteSerializer(cliente).data
        orderproduct_serializado = OrderProductSerializer(orderproduct, many=True).data


        tiempo = instance.tiempo

        data['fecha'] = instance.dateFormated()
        print(data['tiempo'])
        data['tiempo'] = tiempo
        data['cliente'] = cliente_serializado
        data['orderproduct'] = orderproduct_serializado
        

        return data
 
