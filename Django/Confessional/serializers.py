#Code from https://www.django-rest-framework.org/tutorial/quickstart/
#Used quickstart code to get the API up and running quickly and
#without making any mistakes in set up.

from django.contrib.auth.models import User, Group
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']