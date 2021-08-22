import uuid

from django.contrib.auth.models import User
from django.db import models

FILE_TYPES = [
    ('audio', 'audio'),
    ('document', 'document'),
    ('image', 'image'),
    ('video', 'video'),
]


class Group(models.Model):
    uuid = models.UUIDField(editable=False, default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f'{self.uuid}'


class Contact(models.Model):
    display_name = models.CharField(max_length=50)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['display_name', 'group', 'user']

    def __str__(self):
        return f'{self.group}'


class Chat(models.Model):
    message = models.TextField()
    file_type = models.CharField(max_length=8, choices=FILE_TYPES, blank=True, null=True)
    files = models.JSONField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='chat')

    def __str__(self):
        return f'{self.sender}'
