from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        # model that is saved
        model = User
        # fields that the form populates and in what order
        fields = ['username', 'email', 'password1', 'password2']