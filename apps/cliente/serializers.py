from rest_framework import serializers
from .models import Cliente


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('id', 'nombre', 'dni', 'escribano', 'telefono')
        

    def create(self, validated_data):
        dni = validated_data['dni']
        if Cliente.objects.filter(dni=dni).exists():
            raise serializers.ValidationError({'message': ['El cliente con este Dni/Cuit ya existe']})
        return Cliente.objects.create(**validated_data)
    