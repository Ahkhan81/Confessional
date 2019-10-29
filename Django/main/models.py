from django.db import models

# Create your models here.
class Admin(models.Model):
    email = models.CharField(max_length=40)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    phone = models.CharField(max_length=10)
    pwd = models.CharField(max_length=12)

    def __str__(self):
        return '{} {} {} {} {}'.format(self.email, self.fname, self.lname, self.phone, self.pwd)

class Actions(models.Model):
    REMOVE_MEMBER = 'Remove Member'
    VERIFY_EVENT = 'Verify Event'
    APPROVE_MEMBER = 'Approve Member'
    RESTRICT_MEMBER = 'Restrict Member'
    UPDATE_MEMBER = 'Update Member'
    #CREATE_NEW_ACTION = 'Create New Action'
    
    ADMIN_ACTION_TYPES = [
        (REMOVE_MEMBER, ('Remove a member')),
        (VERIFY_EVENT, ('Verify an event')),
        (APPROVE_MEMBER, ('Approve a member')),
        (RESTRICT_MEMBER, ('Restrict a member')),
        (UPDATE_MEMBER, ('Update a member')),
    ]
    action_type = models.CharField(max_length=50, choices=ADMIN_ACTION_TYPES)

class AdminActions(models.Model):
    action_type = models.ForeignKey(
        Actions, on_delete=models.CASCADE
    )
    admin_id = models.ForeignKey(
        Admin, on_delete=models.CASCADE
    )
    action_time = models.DateTimeField(auto_now=True)
    service_id = models.IntegerField

class User_logins(models.Model):
    timestamp = models.DateTimeField(auto_now=True)

class User(models.Model):

    FACULTY = 'Faculty'
    STAFF = 'Staff'
    STUDENT = 'Student'
    
    USER_TYPES = [
        (FACULTY, ('Faculty')),
        (STAFF, ('Staff')),
        (STUDENT, ('Student')),
    ]

    username = models.CharField(max_length=30)
    fname = models.CharField(max_length=50)
    lname = models.CharField(max_length=50)
    user_email = models.CharField(max_length=40)
    user_type = models.CharField(max_length=15, choices=USER_TYPES)

class Hashes(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE
    )
    username = models.CharField(max_length=30)
    hashval = models.CharField(max_length=128)
