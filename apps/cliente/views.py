from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ClienteSerializer
from .models import Cliente
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter 
# Create your views here.
class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()
    filter_backends = SearchFilter, OrderingFilter
    search_fields = ('nombre', 'identificacion')


    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        total_registros = queryset.count()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            'total_registros': total_registros,
            'results': serializer.data
        }
        return Response(response_data)