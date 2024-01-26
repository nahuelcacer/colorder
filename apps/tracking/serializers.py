from .models import Steps, Sectors, OrderStatus
from rest_framework import serializers
from apps.pedido.serializers import OrderSerializer
from apps.pedido.models import Pedido

class StepsSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Steps
        fields = "__all__"

class SectorsSerializers(serializers.ModelSerializer):
    step_id = StepsSerializers()
    class Meta:
        model = Sectors
        fields = ('id' , 'name', 'created_at', 'step_id')
    
    def create(self,validated_data):
        pr_data = validated_data.pop('step_id')
        step = Steps.objects.get(**pr_data)
        sector = Sectors.objects.create(step_id=step,**validated_data)
        return sector


class OrderStatusSerializers(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ('id', 'sector' , 'pedido', 'created_at', 'tiempo')

    def to_representation(self,instance):
        data = super().to_representation(instance)
        data.pop('pedido')
        # print(instance.values())
        sector = instance.sector
        # obj_sector = Sectors.objects.get(id=sector)
        ser_sector = SectorsSerializers(sector).data

        # pedido = instance.pedido
        # obj_pedido = Pedido.objects.get(id=pedido)
        # ser_pedido = OrderSerializer(pedido).data





        data['sector'] = ser_sector
        # data['pedido'] = ser_pedido

        return data
 