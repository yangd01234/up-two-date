from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='calendar-home'),
    path('about/', views.about, name='calendar-about'),
]