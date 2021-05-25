from django.urls import path,include

from .views import index
urlpatterns = [
    path('',index),
    path('join-classroom',index ),
    path('create-classroom',index ),
    path('join-classroom',index ),
    path('classroom/<int:id>',index ),
]