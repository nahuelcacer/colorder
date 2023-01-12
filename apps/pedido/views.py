from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrderSerializer, OrderProductSerializer
from .models import Pedido, OrderProduct
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters

# Create your views here.
class PedidosFilter(filters.FilterSet):
    nombre = filters.CharFilter(lookup_expr='icontains')
    class Meta:
            model = Pedido
            fields = ['nombre', 'recibo', 'factura']
class PedidoView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Pedido.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['completado', 'recibo', 'factura']
    filterset_class = PedidosFilter
    
class OrderProductView(viewsets.ModelViewSet):
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()




