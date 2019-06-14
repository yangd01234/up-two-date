from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
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

class TimeCreateView(LoginRequiredMixin, CreateView):
    model = Time
    fields = ['title','color','start_time','end_time']

    # set form author to current logged in user
    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

class TimeUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Time
    fields = ['title','color','start_time','end_time']

    # set form author to current logged in user
    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)

    # validate if time belonds to user
    def test_func(self):
        model = Time

        time = self.get_object()
        if self.request.user == time.owner:
            return True
        else:
            return False


class TimeDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Time
    success_url = '/'

    # validate if time belonds to user
    def test_func(self):
        time = self.get_object()
        if self.request.user == time.owner:
            return True
        else:
            return False
# about
def about(request):
    return render(request, 'cal/about.html', {'title': 'About'})
