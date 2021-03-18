from .models import *
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .constant import *
from django.utils.six import text_type


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        self.user = authenticate(**{
            self.username_field: attrs[self.username_field],
            'password': attrs['password'],
        })

        if self.user is None:
            raise serializers.ValidationError(ACCOUNT_NOT_FOUND)
        if self.user.is_email_verified is False:
            raise serializers.ValidationError(EMAIL_NOT_VERIFIED)

        refresh = self.get_token(self.user)

        return {
            'email': self.user.email,
            'refresh': text_type(refresh),
            'access': text_type(refresh.access_token),
        }


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class CreateUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    password = serializers.CharField()
    company = serializers.CharField()
    role = serializers.CharField()
    title = serializers.CharField()

