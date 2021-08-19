from django.contrib import admin

from .models import Chat, Group, GroupUser


class ChatAdmin(admin.ModelAdmin):
    list_display = ['sender', 'group']


admin.site.register(Chat, ChatAdmin)
admin.site.register(Group)
admin.site.register(GroupUser)
