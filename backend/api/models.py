from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Teacher(models.Model):
    name = models.CharField(max_length=100)
    semesters = models.CharField(max_length=600)
    description = models.CharField(max_length=1600)


class Comment(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)

    text = models.CharField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)

    