from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, DetailView
from .models import Time

# homepage
@login_required
def home(request):
    context = {
        'c_save': Time.objects.all()
    }
    return render(request, 'cal/home.html', context)

# class list based view to display saved times, inherits from ListView
class TimeListView(ListView):
    model = Time
    template_name = 'cal/home.html' # convention: <app>/<model>_<viewtype>.html
    context_object_name = 'c_save'

class TimeDetailView(DetailView):
    model = Time

# about
def about(request):
    return render(request, 'cal/about.html', {'title': 'About'})
