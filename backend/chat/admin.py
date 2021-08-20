from django.contrib import admin

from .models import Chat, Group, GroupUser


class ChatAdmin(admin.ModelAdmin):
    list_display = ['sender', 'group', 'timestamp']


class GroupAdmin(admin.ModelAdmin):
    list_display = ['uuid', 'name']


class GroupUserAdmin(admin.ModelAdmin):
    list_display = ['group', 'user', 'display_name']


admin.site.register(Chat, ChatAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(GroupUser, GroupUserAdmin)
