from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PedidoSerializer, OrderSerializer
from .models import Pedido, OrderProduct

# Create your views here.

class PedidoView(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all()

class OrderProductView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = OrderProduct.objects.all()