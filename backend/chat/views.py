from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Group, Contact, Chat
from .serializers import ContactSerializer, ChatSerializer


class ContactCreateView(APIView):
    def post(self, request):
        group, _ = Group.objects.get_or_create(name=request.data['group'])
        user1 = get_object_or_404(User, username=request.data['user1'])
        user2 = get_object_or_404(User, username=request.data['user2'])
        contact1, _ = Contact.objects.get_or_create(group=group, user=user1, display_name=user2.username)
        contact2, _ = Contact.objects.get_or_create(group=group, user=user2, display_name=user1.username)
        channel_layer = get_channel_layer()
        serialized_data = ContactSerializer(contact2).data
        serialized_data['group'] = str(serialized_data['group'])
        async_to_sync(channel_layer.group_send)(f'contact_{contact2.user}', {
            'type': 'new_contact',
            **serialized_data
        })
        return Response('Created', status=status.HTTP_200_OK)


class ContactListByGroupView(APIView):
    def get(self, request, group):
        groups = Contact.objects.filter(group=group)
        serializer = ContactSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ContactListByUserView(APIView):
    def get(self, request, username):
        groups = Contact.objects.filter(user__username=username)
        serializer = ContactSerializer(groups, many=True)
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
        chats = Chat.objects.filter(group=group).order_by('timestamp')
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
