# from .serializers import CustomTokenObtainPairSerializer

# from rest_framework_simplejwt.views import TokenObtainPairView

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework.decorators import api_view
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         # print(dir(user))
#         # print(user)
#         # Add custom claims
#         # print(dir(user.groups.count))
#         # print(user.get_user_permissions(), "sssssssssss")
#         token['groups'] = [{'nombre':group.name.capitalize(), 'id':group.id, 'url':group.name} for group in user.groups.all()]
#         token['username'] = user.username
#         token['email'] = user.email
#         token['rutas'] = user.rutas
#         # ...

#         return token

# class CustomTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         'api/token',
#         'api/token/refresh'
#     ]

#################################################################
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'username': user.username
        })