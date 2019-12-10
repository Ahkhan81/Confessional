from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('admins', views.AdminView)
router.register('actions', views.ActionsView)
router.register('adminactions', views.AdminActionsView)
router.register('categories', views.CategoriesView)
router.register('hashes', views.HashesView)
router.register('message', views.MessageView)
router.register('usergroup', views.UsergroupView)
router.register('userlogins', views.UserLoginView)
router.register('users', views.UserView)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/admins/<int:admin_id>', views.admin_specific),
    path('api/users/<int:user_id>', views.user_specific),
    path('api/messages/', views.message_page_view)
]
