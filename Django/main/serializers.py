#Code from https://www.django-rest-framework.org/tutorial/quickstart/
#Used quickstart code to get the API up and running quickly and
#without making any mistakes in set up.

from rest_framework import serializers
from .models import Admin, Actions, AdminActions, Categories, Hashes, Message, Usergroup, User_logins, User

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ('admin_id', 'email', 'fname', 'lname', 'phone')

class ActionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actions
        fields = ('action_num', 'action_type')

class AdminActionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminActions
        fields = ('action_num', 'action_type', 'admin_id', 'action_time')

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('category_id', 'category_name', 'admin_id')

class HashesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashes
        fields = ('user_id', 'username', 'hashval')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('msg_id', 'user_id', 'msg_time', 'msg_text', 'category_id' , 'msg_thread', 'thread_title')

class UsergroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usergroup
        fields = ('group_id', 'group_num', 'category_id', 'category_name', 'username', 'user_id')

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_logins
        fields = ('login_id', 'time_in', 'time_out')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'username', 'fname', 'lname', 'user_email', 'user_type')