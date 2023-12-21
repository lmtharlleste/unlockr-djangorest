from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from .api.serializers import UserSerializer, TokenObtainPairSerializer
import qrcode, pyotp, time
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login
import os
from rest_framework import status
from django.conf import settings

class CreateQrcodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get('email', '')
            password = request.data.get('password', '')

            # Autenticação do usuário
            user = authenticate(request, username=email, password=password)

            if user is not None:
                # Crie a chave TOTP usando o e-mail do usuário
                totp = pyotp.TOTP(email)

                # Crie o URI do QR code
                uri = totp.provisioning_uri(name=email, issuer_name="Unlockr")

                # Caminho para a pasta onde as imagens serão salvas
                folder_path = os.path.join(settings.MEDIA_ROOT, 'qrcodes')

                # Verifique se a pasta existe, se não, crie
                os.makedirs(folder_path, exist_ok=True)

                # Salve o QR code como uma imagem na pasta especificada
                image_filename = f"{user.id}.png"
                image_path = os.path.join(folder_path, image_filename)
                qrcode.make(uri).save(image_path)

                # Construa o URL completo para a imagem
                image_url = os.path.join(settings.MEDIA_URL, 'qrcodes', image_filename)

                return Response({'detail': f"http://127.0.0.1:8000{image_url}"}, status=status.HTTP_201_CREATED)
            else:
                return Response({'detail': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as err:
            return Response({'detail': f'Erro: {err}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class RegisterView(APIView):
    http_method_names = ['post']

    def post(self, *args, **kwargs):
        serializer = UserSerializer(data=self.request.data)
        if serializer.is_valid():
            get_user_model().objects.create_user(**serializer.validated_data)
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST, data={'errors': serializer.errors})
    
    
class GetCurrentUser(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_data = {
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,  # Substitua por qualquer campo adicional que você deseja acessar
            # Adicione outros campos conforme necessário
        }

        return Response(user_data)


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer