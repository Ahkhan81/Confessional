from django.contrib import admin
from .models import Admin, Actions, AdminActions, Hashes, User_logins, User
# Register your models here.

admin.site.register(Admin)
admin.site.register(Actions)
admin.site.register(AdminActions)
admin.site.register(Hashes)
admin.site.register(User_logins)
admin.site.register(User)
