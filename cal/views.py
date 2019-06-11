from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Time

# homepage
@login_required
def home(request):
    context = {
        'c_save': Time.objects.all()
    }
    return render(request, 'cal/home.html', context)

# about
def about(request):
    return render(request, 'cal/about.html', {'title': 'About'})
