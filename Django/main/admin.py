from django.contrib import admin
from .models import Admin, Actions, AdminActions, Categories, Hashes, Message, Usergroup, User_logins, User
# Register your models here.

admin.site.register(Admin)
admin.site.register(Actions)
admin.site.register(AdminActions)
admin.site.register(Categories)
admin.site.register(Hashes)
admin.site.register(Message)
admin.site.register(Usergroup)
admin.site.register(User_logins)
admin.site.register(User)
