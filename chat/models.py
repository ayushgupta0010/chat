from django.contrib.auth.models import User
from django.db import models


class Group(models.Model):
    name = models.CharField(max_length=50)
    display_name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class GroupUser(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE)
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.group}'


class Chat(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='chat')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender}'
