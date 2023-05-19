from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from apps.pedido import views
from apps.cliente.views import ClienteView
from apps.producto.views import ProductoView
from apps.tracking.views import StepsView, SectorsViews, OrderStatusViews
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'pedidos', views.PedidoView, 'pedido')
router.register(r'orderproducts', views.OrderProductView, 'orderproducts' )
router.register(r'clientes', ClienteView, 'clientes' )
router.register(r'productos', ProductoView, 'productos' )
router.register(r'steps', StepsView, 'steps' )
router.register(r'sectors', SectorsViews, 'sectors' )
router.register(r'tracking', OrderStatusViews, 'tracking' )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), 
    path('api/token/', include('apps.usuario.urls')),
    path('', TemplateView.as_view(template_name="index.html")),
    path('cobranza/', TemplateView.as_view(template_name="index.html")),
    path('factura/', TemplateView.as_view(template_name="index.html")),
    path('productos/', TemplateView.as_view(template_name="index.html")),
    path('tracking/', TemplateView.as_view(template_name="index.html")),
]
