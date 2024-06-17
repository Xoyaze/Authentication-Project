from django.urls import path
from .views import UserList, UserDelete, TeacherList, CommentsList, CommentsSelf
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('signup/', UserList.as_view()),
    path('deleteAccount/', UserDelete.as_view()),
    path('teachers/', TeacherList.as_view()),
    path('comments/', CommentsList.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('comments/personal', CommentsSelf.as_view()),
]

