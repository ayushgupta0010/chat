import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User

from .serializers import ChatSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def create_chat(self, sender, group, message):
        data = {'sender': User.objects.get(username=sender).id, 'group': group, 'message': message}
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return serializer.data

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'chat_message',
            'sender': text_data_json['sender'],
            'group': text_data_json['group'],
            'message': text_data_json['message'],
        })

    async def chat_message(self, event):
        del event['type']
        chat = await self.create_chat(**event)
        await self.send(text_data=json.dumps({
            'sender': chat['sender'],
            'message': chat['message']
        }))
