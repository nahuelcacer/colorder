from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ClienteSerializer
from .models import Cliente
from rest_framework.filters import SearchFilter, OrderingFilter 
# Create your views here.
class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()
    filter_backends = SearchFilter, OrderingFilter
    search_fields = ('nombre', 'identificacion')