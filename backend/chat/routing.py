from django.urls import re_path

from .consumers import ChatConsumer, ContactConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+[0-9a-f-]+)/$', ChatConsumer.as_asgi()),
    re_path(r'ws/contact/(?P<room_name>\w+[0-9a-f-]+)/$', ContactConsumer.as_asgi()),
]
