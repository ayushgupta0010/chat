from rest_framework.serializers import ModelSerializer

from .models import Chat, Contact


class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(ContactSerializer, self).to_representation(instance)
        rep['group_name'] = instance.group.name
        rep['user'] = instance.user.username
        rep['last'] = ChatSerializer(instance.group.chat.all().order_by('-timestamp').first()).data
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
