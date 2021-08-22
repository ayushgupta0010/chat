from django.urls import path

from . import views

urlpatterns = [
    path('create', views.ChatCreateView.as_view()),
    path('list/<uuid:group>', views.ChatListView.as_view()),

    path('groups/create', views.ContactCreateView.as_view()),
    path('groups/list/group/<uuid:group>', views.ContactListByGroupView.as_view()),
    path('groups/list/user/<username>', views.ContactListByUserView.as_view()),
]
