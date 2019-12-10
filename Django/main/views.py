from django.shortcuts import render
from rest_framework import viewsets, generics
from .models import Admin, Actions, AdminActions, Categories, Hashes, Message, Usergroup, User_logins, User
from .serializers import AdminSerializer, ActionsSerializer, AdminActionsSerializer, CategoriesSerializer, HashesSerializer, MessageSerializer, UsergroupSerializer, UserLoginSerializer, UserSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

# Create your views here.
class CustomPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get.previous.link(),
            },
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'results': data
        })

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

class admin_specific(viewsets.ModelViewSet):
    def get_queryset(self):
        admin_id = self.kwargs['admin_id']
        return Admin.objects.filter(admin_id=admin_id)
    serializer_class = AdminSerializer

class user_specific(viewsets.ModelViewSet):
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return User.objects.filter(user_id=user_id)
    serializer_class = UserSerializer

class message_page_view(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    pagination_class = CustomPagination
    queryset = Message.objects.all()