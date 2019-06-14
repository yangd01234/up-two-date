from django.urls import path
from .views import TimeListView, TimeDetailView, TimeCreateView, TimeUpdateView, TimeDeleteView
from . import views

urlpatterns = [
    path('', TimeListView.as_view(), name='calendar-home'),
    # django receives variable in url
    path('time/<int:pk>/', TimeDetailView.as_view(), name='time-detail'),
    # create and update will share the same template
    path('time/new/', TimeCreateView.as_view(), name='time-create'),
    path('time/<int:pk>/update/', TimeUpdateView.as_view(), name='time-update'),
    path('time/<int:pk>/delete/', TimeDeleteView.as_view(), name='time-delete'),
    path('about/', views.about, name='calendar-about'),
]