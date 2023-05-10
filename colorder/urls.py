"""colorder URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
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
    path('', TemplateView.as_view(template_name="index.html")),
    path('cobranza/', TemplateView.as_view(template_name="index.html")),
    path('factura/', TemplateView.as_view(template_name="index.html")),
    path('productos/', TemplateView.as_view(template_name="index.html")),
    path('tracking/', TemplateView.as_view(template_name="index.html")),
]
