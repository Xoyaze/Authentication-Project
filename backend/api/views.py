from django.shortcuts import render
from .serializers import UserSerializer, TeacherSerializer, CommentSerializer
from .models import Teacher, Comment
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny


class UserList(APIView):

    permission_classes = [AllowAny]
    def get(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserDelete(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        try:
            user.delete()
            return Response({"detail":"The user is deleted and can no longer sign in"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail":"An error occurred deleting the user: ".format(str(e))}, status=status.HTTP_409_CONFLICT)
        

class TeacherList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Teacher.objects.all()
        serializer = TeacherSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail":"Added the teacher to the database"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class TeacherById(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        teacherId = request.query_params.get('id');
        if(teacherId is None):
            return Response({"detail": "Teacher Id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            teacherId = int(teacherId)
        except ValueError:
            return Response({"detail": "Provide the teacher id."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            teacher = Teacher.objects.get(id=teacherId)
            serializer = TeacherSerializer(teacher)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Teacher.DoesNotExist:
            return Response({'detail': "The teacher doesn't exist."}, status=status.HTTP_404_NOT_FOUND)
        

class CommentById(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        commentId = request.query_params.get('id');
        if(commentId is None):
            return Response({"detail": "Comment Id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            commentId = int(commentId)
        except ValueError:
            return Response({"detail": "Provide the comment id."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            comment = Comment.objects.get(id=commentId)
            serializer = CommentSerializer(comment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Teacher.DoesNotExist:
            return Response({'detail': "The comment doesn't exist."}, status=status.HTTP_404_NOT_FOUND)
    
        


class CommentsList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Comment.objects.all()
        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        try:
            teacher = Teacher.objects.get(id=request.data.get('teacher_id'))
        except Teacher.DoesNotExist:
            return Response({"detail": "The teacher does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CommentSerializer(data=request.data, context={'request':request, 'teacher': teacher})
        if serializer.is_valid():
            serializer.save()
            return Response({"detail":"Created the comment"}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CommentsSelf(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        queryset = Comment.objects.filter(user=request.user)
        serializer = CommentSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    