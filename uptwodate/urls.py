from django.contrib import admin
# import as auth_views becasue multiple different views are being imported
from django.contrib.auth import views as auth_views
from django.urls import path, include
from users import views as user_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # map to the cal folder urls.py
    path('',include('cal.urls')),
    # map to the users folder urls.py
    path('register/', user_views.register, name='register'),
    # map to login and logout
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
    # map to profile
    path('profile/', user_views.profile, name='profile'),
]
