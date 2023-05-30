from .serializers import CustomTokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # print(dir(user))
        # print(user)
        # Add custom claims
        # print(dir(user.groups.count))
        # print(user.get_user_permissions(), "sssssssssss")
        token['groups'] = [{'nombre':group.name.capitalize(), 'id':group.id, 'url':group.name} for group in user.groups.all()]
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'api/token/refresh'
    ]
