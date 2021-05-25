from django.urls import path, include

from .views import ClassroomView, CreateClassroomView, CreateNoteView, \
    NotesView, DeleteNoteView, DeleteClassroomView
urlpatterns = [
    path('room', ClassroomView.as_view()),
    path('create-room', CreateClassroomView.as_view()),
    path('delete-room', DeleteClassroomView.as_view()),
    path('create-note', CreateNoteView.as_view()),
    path('notes', NotesView.as_view()),
    path('delete-note', DeleteNoteView.as_view()),
]
