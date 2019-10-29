from django.shortcuts import render
from rest_framework import viewsets
from .models import Admin, Actions, AdminActions, Hashes, User_logins, User
from .serializers import AdminSerializer, ActionsSerializer, AdminActionsSerializer, HashesSerializer, UserLoginSerializer, UserSerializer

# Create your views here.

class AdminView(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    serializer_class = AdminSerializer

class ActionsView(viewsets.ModelViewSet):
    queryset = Actions.objects.all()
    serializer_class = ActionsSerializer

class AdminActionsView(viewsets.ModelViewSet):
    queryset = AdminActions.objects.all()
    serializer_class = AdminActionsSerializer

class HashesView(viewsets.ModelViewSet):
    queryset = Hashes.objects.all()
    serializer_class = HashesSerializer

class UserLoginView(viewsets.ModelViewSet):
    queryset = User_logins.objects.all()
    serializer_class = UserLoginSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer