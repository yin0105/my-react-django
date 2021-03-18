from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager


class User(AbstractUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True,)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    user_role = models.CharField(max_length=10, blank=True)
    email_verification_code = models.CharField(max_length=10, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Email & Password are required by default.

    class Meta:
        db_table = 'users'
