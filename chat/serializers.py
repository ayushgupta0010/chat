from rest_framework.serializers import ModelSerializer

from .models import Chat, GroupUser


class GroupUserSerializer(ModelSerializer):
    class Meta:
        model = GroupUser
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(GroupUserSerializer, self).to_representation(instance)
        rep['group_name'] = instance.group.name
        rep['user'] = instance.user.username
        return rep


class ChatSerializer(ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(ChatSerializer, self).to_representation(instance)
        rep['group_name'] = instance.group.name
        rep['sender'] = instance.sender.username
        return rep
