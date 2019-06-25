from django.shortcuts import render, redirect
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Time
from django.contrib import messages
from django.conf import settings

# homepage
@login_required(login_url='/login/')
def home(request):
    context = {
        'c_save': Time.objects.filter(owner=request.user),
        # mask google calendar information
        'GOOG_CAL_CLIENT_ID': settings.GOOG_CAL_CLIENT_ID,
        'GOOG_API_KEY': settings.GOOG_API_KEY
    }
    return render(request, 'cal/home.html', context)

# gives details on saved time
class TimeDetailView(DetailView):
    model = Time

# creates a new time
class TimeCreateView(LoginRequiredMixin, CreateView):
    model = Time
    fields = ['title','start_time','end_time']

    def form_valid(self, form):

        # validate if times <= 5
        if len(Time.objects.filter(owner=self.request.user)) >= 5:
            return redirect("/")
        # set form author to current logged in user and 
        form.instance.owner = self.request.user

        # validates if start time is smaller than end time
        start_time = form.cleaned_data['start_time']
        end_time = form.cleaned_data['end_time']
        if end_time <= start_time:
            form.add_error("start_time", 'start time must be smaller than end time')
            form.add_error("end_time", 'start time must be smaller than end time')
            return super().form_invalid(form)
        return super().form_valid(form)

# updates time
class TimeUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Time
    fields = ['title','start_time','end_time']

    # set form author to current logged in user
    def form_valid(self, form):
        form.instance.owner = self.request.user

        # validates if start time is smalelr than end time
        start_time = form.cleaned_data['start_time']
        end_time = form.cleaned_data['end_time']
        if end_time <= start_time:
            form.add_error("start_time", 'start time must be smaller than end time')
            form.add_error("end_time", 'start time must be smaller than end time')
            return super().form_invalid(form)
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

    # validate if time belongs to user
    def test_func(self):
        time = self.get_object()
        if self.request.user == time.owner:
            return True
        else:
            return False
# about
def about(request):
    return render(request, 'cal/about.html', {'title': 'About'})
