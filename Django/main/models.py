# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
   name = models.CharField(unique=True, max_length=150)

   class Meta:
       managed = False
       db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
   group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
   permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

   class Meta:
       managed = False
       db_table = 'auth_group_permissions'
       unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
   name = models.CharField(max_length=255)
   content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
   codename = models.CharField(max_length=100)

   class Meta:
       managed = False
       db_table = 'auth_permission'
       unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
   password = models.CharField(max_length=128)
   last_login = models.DateTimeField(blank=True, null=True)
   is_superuser = models.IntegerField()
   username = models.CharField(unique=True, max_length=150)
   first_name = models.CharField(max_length=30)
   last_name = models.CharField(max_length=150)
   email = models.CharField(max_length=254)
   is_staff = models.IntegerField()
   is_active = models.IntegerField()
   date_joined = models.DateTimeField()

   class Meta:
       managed = False
       db_table = 'auth_user'


class AuthUserGroups(models.Model):
   user = models.ForeignKey(AuthUser, models.DO_NOTHING)
   group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

   class Meta:
       managed = False
       db_table = 'auth_user_groups'
       unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
   user = models.ForeignKey(AuthUser, models.DO_NOTHING)
   permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

   class Meta:
       managed = False
       db_table = 'auth_user_user_permissions'
       unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
   action_time = models.DateTimeField()
   object_id = models.TextField(blank=True, null=True)
   object_repr = models.CharField(max_length=200)
   action_flag = models.PositiveSmallIntegerField()
   change_message = models.TextField()
   content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
   user = models.ForeignKey(AuthUser, models.DO_NOTHING)

   class Meta:
       managed = False
       db_table = 'django_admin_log'


class DjangoContentType(models.Model):
   app_label = models.CharField(max_length=100)
   model = models.CharField(max_length=100)

   class Meta:
       managed = False
       db_table = 'django_content_type'
       unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
   app = models.CharField(max_length=255)
   name = models.CharField(max_length=255)
   applied = models.DateTimeField()

   class Meta:
       managed = False
       db_table = 'django_migrations'


class DjangoSession(models.Model):
   session_key = models.CharField(primary_key=True, max_length=40)
   session_data = models.TextField()
   expire_date = models.DateTimeField()

   class Meta:
       managed = False
       db_table = 'django_session'


class Actions(models.Model):
   REMOVE_MEMBER = 'Remove Member'
   VERIFY_EVENT = 'Verify Event'
   APPROVE_MEMBER = 'Approve Member'
   RESTRICT_MEMBER = 'Restrict Member'
   UPDATE_MEMBER = 'Update Member'
   # CREATE_NEW_ACTION = 'Create New Action'

   ADMIN_ACTION_TYPES = [
       (REMOVE_MEMBER, ('Remove a member')),
       (VERIFY_EVENT, ('Verify an event')),
       (APPROVE_MEMBER, ('Approve a member')),
       (RESTRICT_MEMBER, ('Restrict a member')),
       (UPDATE_MEMBER, ('Update a member')),
   ]
   action_type = models.CharField(max_length=50, choices=ADMIN_ACTION_TYPES)
   action_num =  models.AutoField(db_column = "action_num", primary_key=True)

   def __str__(self):
       return '{}'.format(self.action_type)


   class Meta:
       managed = False
       db_table = 'action'


class Admin(models.Model):
   admin_id = models.AutoField(db_column = "admin_id", primary_key=True)
   email = models.CharField(max_length=40)
   fname = models.CharField(max_length=50)
   lname = models.CharField(max_length=50)
   phone = models.CharField(max_length=10, db_column = "phone_number")
   pwd = models.CharField(max_length=12)

   def __str__(self):
       return '{} {} {} {} {}'.format(self.email, self.fname, self.lname, self.phone, self.pwd)

   class Meta:
       managed = False
       db_table = 'admin_user'

class User(models.Model):

   FACULTY = 'Faculty'
   STAFF = 'Staff'
   STUDENT = 'Student'

   USER_TYPES = [
       (FACULTY, ('Faculty')),
       (STAFF, ('Staff')),
       (STUDENT, ('Student')),
   ]
   user_id = models.AutoField(db_column = "user_id", primary_key=True)
   username = models.CharField(max_length=30)
   fname = models.CharField(max_length=50)
   lname = models.CharField(max_length=50)
   user_email = models.CharField(max_length=40)
   user_type = models.CharField(max_length=15, choices=USER_TYPES)

   class Meta:
       managed = False
       db_table = 'users'
   
   @classmethod
   def create(cls, email, displayName):
        user = cls(user_email = email, username = displayName, user_type = 'Student')
        user.save()
        return user

class AdminActions(models.Model):
   action_type = models.ForeignKey(
       Actions, db_column="action_type", on_delete=models.CASCADE
   )
   action_num = models.AutoField(db_column = "action_num", primary_key=True)
   admin_id = models.ForeignKey(Admin, db_column = 'admin_id', on_delete=models.CASCADE)
   action_time = models.DateTimeField(auto_now=True)

   class Meta:
       managed = False
       db_table = 'admin_action'

class Categories(models.Model):
   category_id = models.AutoField(db_column = "category_id", primary_key=True)
   category_name = models.CharField(max_length=40)
   admin_id = models.ForeignKey(Admin, db_column = 'admin_id', on_delete=models.CASCADE)

   class Meta:
       managed = False
       db_table = 'categories'

class Hashes(models.Model):
   user_id = models.ForeignKey(User, db_column = 'user_id', on_delete=models.CASCADE)
   username = models.CharField(max_length=30)
   hashval = models.CharField(max_length=128, primary_key=True)

   class Meta:
       managed = False
       db_table = 'hashes'

class Message(models.Model):
   msg_id = models.CharField(max_length=64, primary_key=True)
   user_id = models.ForeignKey(User, db_column = 'user_id', on_delete=models.CASCADE)
   msg_time = models.DateTimeField(auto_now=True)
   msg_text = models.TextField()
   category_id = models.ForeignKey(Categories, db_column = 'category_id', on_delete=models.CASCADE)
   msg_thread = models.IntegerField()
   thread_title = models.CharField(max_length=50)
   class Meta:
       managed = False
       db_table = 'message'

class Usergroup(models.Model):
   group_id = models.AutoField(db_column = "group_id", primary_key=True)
   group_num = models.IntegerField
   category_id = models.ForeignKey(Categories, db_column = 'category_id', on_delete=models.CASCADE)
   category_name = models.CharField(max_length=40)
   username = models.CharField(db_column = "user_name", max_length=30)
   user_id = models.ForeignKey(User, db_column = 'user_id', on_delete=models.CASCADE)
   class Meta:
       managed = False
       db_table = 'usergroup'

class User_logins(models.Model):
   login_id = models.AutoField(db_column = "login_id", primary_key=True)
   time_in = models.DateTimeField(auto_now=True)
   time_out = models.DateTimeField(auto_now=True)

   class Meta:
       managed = False
       db_table = 'user_logins'
