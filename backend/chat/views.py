from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Group, GroupUser, Chat
from .serializers import GroupUserSerializer, ChatSerializer


class GroupUserCreateView(APIView):
    def post(self, request):
        group, _ = Group.objects.get_or_create(name=request.data['group'])
        request.data['group'] = group.uuid
        request.data['user'] = get_object_or_404(User, username=request.data['user']).id
        serializer = GroupUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupUserListByGroupView(APIView):
    def get(self, request, group):
        groups = GroupUser.objects.filter(group=group)
        serializer = GroupUserSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GroupUserListByUserView(APIView):
    def get(self, request, username):
        groups = GroupUser.objects.filter(user__username=username)
        serializer = GroupUserSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChatCreateView(APIView):
    def post(self, request):
        request.data['sender'] = get_object_or_404(User, username=request.data['sender']).id
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatListView(APIView):
    def get(self, request, group):
        chats = Chat.objects.filter(group=group).order_by('-timestamp')
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
