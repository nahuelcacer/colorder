from django.shortcuts import render
from rest_framework import viewsets
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

