from django.urls import path
from .views import TimeListView, TimeDetailView
from . import views

urlpatterns = [
    path('', TimeListView.as_view(), name='calendar-home'),
    # django receives variable in url
    path('time/<int:pk>/', TimeDetailView.as_view(), name='time-detail'),
    path('about/', views.about, name='calendar-about'),
]