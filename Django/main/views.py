from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Admin, Actions, AdminActions, Categories, Hashes, Message, Usergroup, User_logins, User
from .serializers import AdminSerializer, ActionsSerializer, AdminActionsSerializer, CategoriesSerializer, HashesSerializer, MessageSerializer, UsergroupSerializer, UserLoginSerializer, UserSerializer
from django.core import serializers
from google.auth import jwt
import json
import datetime

# Create your views here.

PUBLIC_CERT = "-----BEGIN CERTIFICATE-----\nMIIDJjCCAg6gAwIBAgIIBDtSam35pB4wDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xOTExMzAwNDI5MjhaFw0xOTEyMTYxNjQ0MjhaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDsDdy+kN5VyQg5u+3D/1D/wX+JbV+0FHiV\neGS5He45LgrYoGd42NB0A0W2HM1rYY4r8tUHjK3cPrhHNH2JERS9dkw3NkaMUdqG\nTeZTXtSsB8/uvae+hOVXLBMB1lMOfW+WOavmTsXsKN1jMcfK/3KfO7/hv56ZQ2/j\nwFjC3wxcpuL6UYizEQ6CswETQEacpoUwbjHE+0MRfCDtOlWHFLLlM2MO5jv78U/I\nyPCWZmDdvF5BBCDiVZC5IhHj0Fh73f98pgGdebGbtAfvYqxY4mODbdMeQETuCRN6\n4kB2rKu93PdzTxCSyVlqkLWl3FtIg8FsNPCKVA5e2NXucVOne9fPAgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQCvQSFW8kGeoTHplwM0inZr0E7eXHH0\nHjclDodvhZJT+8FZ9wICmly39gHNrmzCI8BhVqQA8FIqis2j14MromxYYV+pgHyq\nMhZ58ugk9X32b54lqNOqBNN+RZv9wvaeTgV2ANtqo5edPKcm8FA9LwI27WZqhNMI\nlmC1hn5wJzRhtyaIqWhdp5HGFrBXj0vbdz9vKtGxum4kFMBYeXsLnOZIdylSmbIx\nEaOLAncq+/I7Gxi39BN5hdA+2oOFynXUpWx9kRSaqwGFPAWeGWczauPUWmI7zoAO\nWl0+e9RVTAIq4EERHK66pjZXxdmxoknYMJk8u5qUCwzZtyobCVlgZOJ0\n-----END CERTIFICATE-----\n"

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
    
    @action(detail=True, methods=['GET'])
    def threadpreviews(self, request, pk=None):
        category = Categories.objects.get(category_id = pk)
        messages = Message.objects.filter(category_id = pk).filter(thread_title__isnull = False)
        
        category = {'id': category.category_id, 'name': category.category_name}
        previews = []
        
        for thread in messages:
            p = {
                'id': thread.msg_thread,
                'title': thread.thread_title,
                'bodySnippet': thread.msg_text,
                'lastActivity': thread.msg_time
            }
            previews.append(p)
        
        return Response({
            'category': category,
            'threadPreviews': previews
        })
    
    

class HashesView(viewsets.ModelViewSet):
    queryset = Hashes.objects.all()
    serializer_class = HashesSerializer

class MessageView(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    
    @action(detail=False, methods=['GET'])
    def thread(self, request):
        thread_id = request.GET.get('thread_id')
        thread = Message.objects.filter(msg_thread = thread_id).get(thread_title__isnull = False)
        messages = Message.objects.filter(msg_thread = thread_id).filter(thread_title = None)
        
        convertMessages = []
        for message in messages:
            m = {
                'id': message.msg_id,
                'user': {
                    'id': message.user_id.user_id,
                    'displayName': message.user_id.username
                },
                'text': message.msg_text,
                'timePosted': message.msg_time
            }
            convertMessages.append(m)
        
        return Response({
            'thread': {
                'id': thread.msg_thread,
                'title': thread.thread_title,
                'body': thread.msg_text,
                'timePosted': thread.msg_time,
                'user': {
                    'id': thread.user_id.user_id,
                    'displayName': thread.user_id.username
                },
            },
            'category': {
                'id': thread.category_id.category_id,
                'name': thread.category_id.category_name
            },
            'messages': convertMessages
        })
    
    @action(detail=False, methods=['POST'])
    def createmessage(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token == None:
            return Response({'error': 'Bearer token was not specified'})
        token = token[7:]
        claims = jwt.decode(token, verify=False)
        email = claims['email']
        user = User.objects.get(user_email = email)

        body = json.loads(request.body)
        if body == None:
            return Response({'error': 'create body empty'})

        msg = Message.create(body['thread_id'], user.user_id, datetime.datetime.now(), body['text'], body['category_id'], 3, body['title'])
        return Response({
            'msg_id': body['thread_id'],
            'user_id': user.user_id,
            'msg_time': datetime.datetime.now(),
            'msg_text': body['text'],
            'category_id': body['category_id'],
            'msg_thread': 3,
            'thread_title': body['title'],
        })
    

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
        claims = jwt.decode(token, verify=False)
        email = claims['email']
        if not email.endswith("@smcm.edu"):
            return Response({'exists': False, 'message': 'EMAIL_DISALLOWED'})
        
        try:
            user = User.objects.get(user_email = email)
        except User.DoesNotExist:
            user = None
            
        if user == None:
            return Response({'exists': False, 'message': 'NOT_REGISTERED'})

        convert = {'id': user.user_id, 'displayName': user.username, 'type': user.user_type, 'administrator': False}
        return Response({'exists': True, 'user': convert})
    
    @action(detail=False, methods=['POST'])
    def register(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        if token == None:
            return Response({'error': 'Bearer token was not specified'})
        token = token[7:]
        claims = jwt.decode(token, verify=False)
        
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
