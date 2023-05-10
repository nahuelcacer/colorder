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
    sector_id = serializers.PrimaryKeyRelatedField(queryset=Sectors.objects.all())
    pedido_id = serializers.PrimaryKeyRelatedField(queryset=Pedido.objects.all())

    class Meta:
        model = OrderStatus
        fields = ('id', 'sector_id', 'pedido_id', 'created_at')

    # def create(self, validated_data):
    #     sector_id = validated_data.pop('sector_id')
    #     pedido_id = validated_data.pop('pedido_id')

    #     sector = Sectors.objects.get(**sector_id)
    #     pedido = Sectors.objects.get(**pedido_id)

    #     orderstatus = OrderStatus.objects.create(sector_id=sector,pedido_id=pedido,**validated_data)
    #     return orderstatus