from django.shortcuts import render
from django.http import HttpResponse


# homepage
def home(request):
    return HttpResponse('<h1>Calendar Home</h1>')

# about
def about(request):
    return HttpResponse('<h1>Calendar About</h1>')
