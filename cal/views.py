from django.shortcuts import render
from .models import Time

# homepage
def home(request):
    context = {
        'c_save': Time.objects.all()
    }
    return render(request, 'cal/home.html', context)

# about
def about(request):
    return render(request, 'cal/about.html', {'title': 'About'})
