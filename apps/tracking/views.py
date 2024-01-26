from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.pedido.models import Pedido
from apps.pedido.serializers import OrderSerializer

from .serializers import StepsSerializers, SectorsSerializers, OrderStatusSerializers
from .models import Steps,Sectors, OrderStatus
from django_filters import rest_framework as filters
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class StepsView(viewsets.ModelViewSet):
    serializer_class = StepsSerializers
    queryset = Steps.objects.all()

class SectorsViews(viewsets.ModelViewSet):
    serializer_class = SectorsSerializers
    queryset = Sectors.objects.all()



##filter
class OrderStatusFilter(filters.FilterSet):
    pedido_id = filters.NumberFilter(method='filter_by_pedido')
    class Meta:
        model = OrderStatus
        fields = ['pedido_id', 'sector_id']

    def filter_by_pedido(self, queryset, name, value):
        if value:
            return queryset.filter(Q(pedido_id=value))
        return queryset
#view
class OrderStatusViews(viewsets.ModelViewSet):
    serializer_class = OrderStatusSerializers
    queryset = OrderStatus.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStatusFilter


class OrderStatusApiView(APIView):
    def get(self, request, id):
        queryset = OrderStatus.objects.filter(pedido=id)
        if not queryset.exists():  # Verifica si la queryset está vacía
            return Response({"message": f"No se encontro un pedido con el id:{id} proporcionado"}, status=status.HTTP_404_NOT_FOUND)
        
        order = Pedido.objects.get(id=id)
        order_serializaer = OrderSerializer(order).data
        
        serializer = OrderStatusSerializers(queryset, many=True)
        order_serializaer['last_tracking'] = serializer.data[-1]
        order_serializaer['history_tracking'] = serializer.data

        return Response(order_serializaer)


