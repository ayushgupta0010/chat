import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User

from .serializers import ChatSerializer


class ChatConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def create_chat(self, sender, group, message, msg_type='text', files=None):
        data = {
            'sender': User.objects.get(username=sender).id, 'group': group,
            'message': message, 'msg_type': msg_type, 'files': files
        }
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
        return serializer.data

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'chat_message',
            'message': text_data_json['message'],
            'msg_type': text_data_json['msg_type'],
            'files': text_data_json['files'],
            'sender': text_data_json['sender'],
            'group': text_data_json['group'],
        })

    async def chat_message(self, event):
        message, msg_type, files = event['message'], event['msg_type'], event['files']
        sender, group = event['sender'], event['group']
        chat = await self.create_chat(sender, group, message, msg_type, files)
        await self.send(text_data=json.dumps({
            'sender': chat['sender'],
            'message': chat['message'],
            'msg_type': chat['msg_type'],
            'files': chat['files'],
            'timestamp': chat['timestamp']
        }))
