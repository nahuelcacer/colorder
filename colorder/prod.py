from dotenv import load_dotenv
import os
from .settings import *
# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
ALLOWED_HOSTS = ["*"]
ROOT_URLCONF = 'colorder.urls'
DEBUG = True

load_dotenv()
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'pedido',
        'HOST': os.environ.get('HOST'),
        'USER': os.environ.get('USER'),
        'PASSWORD': os.environ.get('PASSWORD')
    }
}