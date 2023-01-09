from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrderSerializer, OrderProductSerializer
from .models import Pedido, OrderProduct
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class PedidoView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Pedido.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['completado', 'recibo']

class OrderProductView(viewsets.ModelViewSet):
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()