from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductoSerializer
from .models import Producto
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.

class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['nombre']
