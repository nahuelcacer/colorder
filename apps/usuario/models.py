from django.db import models
from django.urls import reverse
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, AbstractUser




class Usuario(AbstractUser):
    
    def get_absolute_url(self):
        return reverse('index')

        
