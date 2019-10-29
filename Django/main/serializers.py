#Code from https://www.django-rest-framework.org/tutorial/quickstart/
#Used quickstart code to get the API up and running quickly and
#without making any mistakes in set up.

from rest_framework import serializers
from .models import Admin, Actions, AdminActions, Hashes, User_logins, User

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ('id', 'email', 'fname', 'lname', 'phone')

class ActionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actions
        fields = ('id', 'action_type')

class AdminActionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminActions
        fields = ('id', 'action_type', 'admin_id', 'action_time', 'service_id')

class HashesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashes
        fields = ('id', 'user_id', 'username', 'hashval')

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_logins
        fields = ('id', 'timestamp')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'fname', 'lname', 'user_email', 'user_type')