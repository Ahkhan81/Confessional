from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Admin, Actions, AdminActions, Categories, Hashes, Message, Usergroup, User_logins, User
from .serializers import AdminSerializer, ActionsSerializer, AdminActionsSerializer, CategoriesSerializer, HashesSerializer, MessageSerializer, UsergroupSerializer, UserLoginSerializer, UserSerializer
from django.core import serializers
from google.auth import jwt
import json

# Create your views here.

PUBLIC_CERT = "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIBDtSam35pB4wDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xOTExMzAwNDI5MjhaFw0xOTEyMTYxNjQ0MjhaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsDdy+kN5VyQg5u+3D/1D/wX+JbV+0FHiV\neGS5He45LgrYoGd42NB0A0W2HM1rYY4r8tUHjK3cPrhHNH2JERS9dkw3NkaMUdqG\nTeZTXtSsB8/uvae+hOVXLBMB1lMOfW+WOavmTsXsKN1jMcfK/3KfO7/hv56ZQ2/j\nwFjC3wxcpuL6UYizEQ6CswETQEacpoUwbjHE+0MRfCDtOlWHFLLlM2MO5jv78U/I\nyPCWZmDdvF5BBCDiVZC5IhHj0Fh73f98pgGdebGbtAfvYqxY4mODbdMeQETuCRN6\n4kB2rKu93PdzTxCSyVlqkLWl3FtIg8FsNPCKVA5e2NXucVOne9fPAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQCvQSFW8kGeoTHplwM0inZr0E7eXHH0\nHjclDodvhZJT+8FZ9wICmly39gHNrmzCI8BhVqQA8FIqis2j14MromxYYV+pgHyq\nMhZ58ugk9X32b54lqNOqBNN+RZv9wvaeTgV2ANtqo5edPKcm8FA9LwI27WZqhNMI\nlmC1hn5wJzRhtyaIqWhdp5HGFrBXj0vbdz9vKtGxum4kFMBYeXsLnOZIdylSmbIx\nEaOLAncq+/I7Gxi39BN5hdA+2oOFynXUpWx9kRSaqwGFPAWeGWczauPUWmI7zoAO\nWl0+e9RVTAIq4EERHK66pjZXxdmxoknYMJk8u5qUCwzZtyobCVlgZOJ0\n-----END CERTIFICATE-----\n"

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

class admin_specific(viewsets.ModelViewSet):
    def get_queryset(self):
        admin_id = self.kwargs['admin_id']
        return Admin.objects.filter(admin_id=admin_id)
    serializer_class = AdminSerializer

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
    
    @action(detail=False, methods=['GET'])
    def validate(self, request):
        token = request.GET.get('token')
        claims = jwt.decode(token, certs=PUBLIC_CERT)
        email = claims['email']
        if not email.endswith("@smcm.edu"):
            return Response({'exists': False, 'message': 'EMAIL_DISALLOWED'})
        
        try:
            user = User.objects.get(user_email = email)
        except User.DoesNotExist:
            user = None
            
        if user == None:
            return Response({'exists': False, 'message': 'NOT_REGISTERED'})

        #serializer = UserSerializer(user, many=False)
        convert = {'id': user.user_id, 'displayName': user.username, 'type': user.user_type, 'administrator': False}
        return Response({'exists': True, 'user': convert})
    
    @action(detail=False, methods=['POST'])
    def register(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token == None:
            return Response({'error': 'Bearer token was not specified'})
        token = token[7:]
        claims = jwt.decode(token, verify=False,certs=PUBLIC_CERT)
        
        body = json.loads(request.body)
        if body == None or body['displayName'] == None or len(body['displayName'].strip()) == 0:
            return Response({'error': 'displayName must be specified.'})
        
        email = claims['email']
        displayName = body['displayName'].strip()
        
        user = User.create(email, displayName)
        return Response({
            'id': user.user_id,
            'displayName': user.username,
            'type': "Student",
            'administrator': False
            })
