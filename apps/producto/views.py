from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductoSerializer, EntregaSerielizar
from .models import Producto, Entrega
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView

# Create your views here.
class ProductFilter(filters.FilterSet):
    nombre = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Producto
        fields = ['nombre']
class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['nombre']
    filterset_class = ProductFilter

class EntregaView(viewsets.ModelViewSet):
    serializer_class = EntregaSerielizar
    queryset = Entrega.objects.all()

class EntregaAPIView(APIView):
    pass