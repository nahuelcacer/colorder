from django.shortcuts import render
from rest_framework import viewsets
from .serializers import OrderSerializer, OrderProductSerializer
from .models import Pedido, OrderProduct
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.db.models import Q
# Create your views here.
class PedidosFilter(filters.FilterSet):
    cliente = filters.CharFilter(method='filter_by_client')
    
    class Meta:
            model = Pedido
            fields = ['cliente', 'recibo', 'factura']

    def filter_by_client(self, queryset, name, value):
        if value:
            return queryset.filter(Q(cliente__nombre__icontains=value) | Q(cliente__dni__icontains=value))
        return queryset


class PedidoView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Pedido.objects.all()
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['completado', 'recibo', 'factura', 'cliente']
    filterset_class = PedidosFilter
    
class OrderProductView(viewsets.ModelViewSet):
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()




