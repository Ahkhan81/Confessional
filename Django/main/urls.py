from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('admins', views.AdminView)
router.register('actions', views.ActionsView)
router.register('adminactions', views.AdminActionsView)
router.register('hashes', views.HashesView)
router.register('userlogins', views.UserLoginView)
router.register('users', views.UserView)

urlpatterns = [
    path('api/', include(router.urls))    
]
