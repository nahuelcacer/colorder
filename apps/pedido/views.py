from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrderSerializer, OrderItemSerializer
from .models import Pedido, OrderProduct

# Create your views here.

class PedidoView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Pedido.objects.all()

# class OrderProductView(viewsets.ModelViewSet):
#     serializer_class = OrderItemSerializer
#     queryset = OrderProduct.objects.all()