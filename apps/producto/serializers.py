from rest_framework import serializers
from .models import Producto, Entrega


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class EntregaSerielizar(serializers.ModelSerializer):
    class Meta:
        model = Entrega
        fields = '__all__'