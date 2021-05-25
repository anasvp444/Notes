from django.db import models

# Create your models here.

class Classroom(models.Model):
    classroomName = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    description= models.TextField()
    def __str__(self):
        return self.classroom 

class ClassNotes(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    classroom = models.ForeignKey(Classroom,related_name="classroom" ,on_delete=models.CASCADE)
    def __str__(self):
        return self.title     

