from rest_framework import serializers
from .models import Classroom, ClassNotes


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ('id', 'classroomName', 'subject', 'description')

class CreateClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model= Classroom
        fields = ('classroomName', 'subject', 'description')

class ClassNotesSerializer(serializers.ModelSerializer):
    classroom = ClassroomSerializer(read_only=True,many=True)
    class Meta:
        model = ClassNotes
        fields = ('id', 'title', 'text', 'classroom')

class CreateClassNotesSerializer(serializers.ModelSerializer):
    classroom = ClassroomSerializer(read_only=True,many=True)
    class Meta:
        model = ClassNotes
        fields = ('classroom','title', 'text')
