from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from .api.serializers import UserSerializer, TokenObtainPairSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
import os
from rest_framework import status
from django.conf import settings
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer


        

class RegisterView(APIView):
    http_method_names = ['post']

    def post(self, *args, **kwargs):
        serializer = UserSerializer(data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "detail": "Usuário criado com sucesso!"
            }, status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST, data={'errors': serializer.errors})

    
    
class GetCurrentUser(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as err:
            raise ValueError(f"Erro ao encontrar ao obter usuario: {err}")

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer
    
    
    
    
class GetUserFromToken(APIView):
    
    permission_classes = (IsAuthenticated,)
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, **kwargs):
        try:
            user = request.user
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as err:
            raise ValueError(f"Erro ao encontrar ao obter usuario: {err}")