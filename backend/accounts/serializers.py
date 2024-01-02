

# Primeiro, defina um serializador para o modelo User
from rest_framework import serializers
from .models import CustomUser as User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone']  # Ajuste os campos conforme necessário
