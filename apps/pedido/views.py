from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import OrderSerializer, OrderProductSerializer
from apps.cliente.models import Cliente
from apps.producto.models import Producto
from apps.pedido.serializers import OrderSerializer
from .models import Pedido, OrderProduct
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from django.db.models import Q
from django_filters import DateFilter
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import get_object_or_404

# Create your views here.
class PedidosFilter(filters.FilterSet):
    cliente = filters.CharFilter(method='filter_by_client')
    fecha = DateFilter(field_name='fecha', lookup_expr='exact')
    class Meta:
            model = Pedido
            fields = ['cliente', 'recibo', 'factura', 'fecha', 'enPreparacion', 'completado']

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

class PedidoApiView(APIView):
    def get(self, request, pedido_id=None):
    
        # Si no se proporciona un pedido_id, busca y devuelve todos los pedidos
        filterset = PedidosFilter(request.GET, queryset=Pedido.objects.all())
        print(filterset.data)
        filtered_pedidos = filterset.qs

        filtered_pedidos_norecibo = filtered_pedidos.filter(recibo=False)
        pedidos_serializados = OrderSerializer(filtered_pedidos, many=True).data
        pedidos_serializados_norecibo = OrderSerializer(filtered_pedidos_norecibo, many=True).data

        res = {
            'pendientes':len(pedidos_serializados_norecibo),
            'cantidad': len(pedidos_serializados), 
            'data': pedidos_serializados
            
            }

        return Response(res)


    def post(self,request):
        data = request.data
        cliente = data.pop('cliente')
        orderproduct = data.pop('orderproduct')
        # INSTANCE #
        cliente_instance = Cliente.objects.get(id=cliente['id'])
        

        if Pedido.objects.exists():
            last_order = Pedido.objects.latest('id')
            pedido_instance = Pedido.objects.create(cliente=cliente_instance)
            
            if last_order.fecha is not None and last_order.fecha == pedido_instance.fecha:
        # Establecer un valor predeterminado para last_order.orden si es None
                last_order_orden = last_order.orden if last_order.orden is not None else 0
                
                pedido_instance.orden = last_order_orden + 1 
                pedido_instance.save()
            else:
                pedido_instance.orden = 1 
                pedido_instance.save()
        else:
            # If there are no existing orders, set the order number for the new order to 1
            pedido_instance = Pedido.objects.create(cliente=cliente_instance)
            pedido_instance.orden = 1
            pedido_instance.save()
        # pedido_instance = Pedido.objects.create(cliente=cliente_instance)

        orders_instance = []
        for order in orderproduct:
            producto_instance = Producto.objects.get(id=order['producto']['id'])

            orderproduct_instance = OrderProduct.objects.create(producto=producto_instance, cantidad=order['cantidad'], pedido=pedido_instance)
            orders_instance.append(orderproduct_instance)

        tramite_mas_grande = max(orders_instance, key=lambda x: x.producto.tramite)

        
     
        pedido_serialized = OrderSerializer(pedido_instance).data
        suma_precios = sum(item['producto']['precio'] * item['cantidad'] for item in pedido_serialized['orderproduct'])

        pedido_serialized['totalDelPedido'] = suma_precios
        pedido_serialized['horaRetiro'] = tramite_mas_grande.timeToFinish()


        template = loader.get_template('pedido.html')
        rendered_template = template.render(pedido_serialized)

        return HttpResponse(rendered_template)

class PedidoIdApiView(APIView):
    def get(self,request, pedido_id=None):
        if pedido_id is not None:
            # Si se proporciona un pedido_id, devuelve un solo pedido por su ID
            pedido_instance = get_object_or_404(Pedido, id=pedido_id)
            pedido_serializado = OrderSerializer(pedido_instance).data
            res = {'data': pedido_serializado}
        return Response(res)
    
    def put(self, request, pedido_id=None):

        data = request.data
        if pedido_id is not None:
            pedido_instance = get_object_or_404(Pedido, id=pedido_id)
            for key, value in data.items():
                setattr(pedido_instance, key, value)
            try:
                    pedido_instance.completado = pedido_instance.recibo and pedido_instance.factura
                    pedido_instance.save()
            except Exception as e:
                print(f"Error al guardar el pedido: {e}")
        pedido_serialized = OrderSerializer(pedido_instance).data
        return Response(pedido_serialized)


class OrderProductView(viewsets.ModelViewSet):
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()




