from rest_framework import serializers
from .models import Teacher, Comment
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id','name','description','semesters']


class CommentSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id','text','teacher', 'user', 'created_at']
        # extra_kwargs = {
        #     'user': {'read_only': True},
        #     'teacher': {'read_only': True},
        # }

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        validated_data['user'] = user
        validated_data['teacher'] = self.context.get('teacher')
        return Comment.objects.create(**validated_data)