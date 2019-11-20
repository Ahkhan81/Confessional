from django.shortcuts import render
from rest_framework import viewsets
from .models import Admin, Actions, AdminActions, Categories, Hashes, Message, Usergroup, User_logins, User
from .serializers import AdminSerializer, ActionsSerializer, AdminActionsSerializer, CategoriesSerializer, HashesSerializer, MessageSerializer, UsergroupSerializer, UserLoginSerializer, UserSerializer

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

class CategoriesView(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer

class HashesView(viewsets.ModelViewSet):
    queryset = Hashes.objects.all()
    serializer_class = HashesSerializer

class MessageView(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class UsergroupView(viewsets.ModelViewSet):
    queryset = Usergroup.objects.all()
    serializer_class = UsergroupSerializer

class UserLoginView(viewsets.ModelViewSet):
    queryset = User_logins.objects.all()
    serializer_class = UserLoginSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer