from django.urls import path,include

from .views import classroom
urlpatterns = [
    path('',classroom),
]