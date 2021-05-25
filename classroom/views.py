from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core import serializers as djangoSerializers
from .models import Classroom,ClassNotes
from .serializer import ClassroomSerializer,CreateClassroomSerializer, \
        CreateClassNotesSerializer,ClassNotesSerializer


class ClassroomView(generics.ListAPIView):
        queryset = Classroom.objects.all()
        serializer_class = ClassroomSerializer

class CreateClassroomView(APIView):
        serializer_class = CreateClassroomSerializer
        def post(self, request,format=None):
                serializer = self.serializer_class(data= request.data)
                if serializer.is_valid():
                        classroomName = serializer.data.get('classroomName')
                        subject = serializer.data.get('subject')
                        description = serializer.data.get('description')
                        classroom = Classroom(classroomName=classroomName, subject=subject, description=description)
                        classroom.save()
                        return Response(ClassroomSerializer(classroom).data,status=status.HTTP_201_CREATED)
                return Response({'Bad Request':'Invalid data...'},status=status.HTTP_400_BAD_REQUEST)

class DeleteClassroomView(APIView):
        def post(self,request,format=None):
                classroom  = Classroom.objects.filter(id=request.data.get('id'))
                classroom .delete()  
                return Response({'Message':'Success'},status=status.HTTP_200_OK)  

class CreateNoteView(APIView):
        serializer_class =  CreateClassNotesSerializer
        def post(self,request,format=None):
                classrooms = Classroom.objects.filter(id=request.data.get('classroom_id'))
                if len(classrooms) > 0:
                        classroom = classrooms[0]
                        title = request.data.get('title')
                        text = request.data.get('text')
                        note = ClassNotes(title=title,text=text,classroom=classroom)
                        note.save()
                        return Response({'msg':'Added'},status=status.HTTP_201_CREATED)
                return Response({'Bad Request':'Invalid data...'},status=status.HTTP_400_BAD_REQUEST)


class NotesView(APIView):
        serializer_class = ClassNotesSerializer
        look_url_kwarg = 'classroom_id'
        def get(self,request,format=None):
                classroom_id = self.request.GET.get(self.look_url_kwarg)
                classrooms = Classroom.objects.filter(id=classroom_id)
                if len(classrooms) > 0:
                        classroom = classrooms[0]
                        notes = ClassNotes.objects.filter(classroom=classroom)
                        data={}
                        data["classroom"] =djangoSerializers.serialize('json', classrooms)
                        data["notes"] =  djangoSerializers.serialize('json', notes)  
                        print(djangoSerializers.serialize('json', classrooms))
                        print(djangoSerializers.serialize('json', notes))  
                        return JsonResponse(data, safe=False)
                return Response({'Bad Request':'Invalid data...'},status=status.HTTP_400_BAD_REQUEST)
                

class DeleteNoteView(APIView):
        def post(self, request,format=None):
                note = ClassNotes.objects.filter(id=request.data.get('id'))
                note.delete()  
                return Response({'Message':'Success'},status=status.HTTP_200_OK)                          
