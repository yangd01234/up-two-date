from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.validators import MaxValueValidator, MinValueValidator
import datetime

class Time(models.Model):
    title = models.CharField(max_length=30)
    color = models.CharField(default='#000000', max_length=7)
    start_time = models.TimeField(default=datetime.time(00,00))
    end_time = models.TimeField(default=datetime.time(00,00))
    # days from start.  if 0, then same day
    days = models.IntegerField(default=0, validators=[MaxValueValidator(30), MinValueValidator(0)])
    # one to many relationship, if user gets deleted, time gets deleted
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    # get url as a string and let view handle redirect
    def get_absolute_url(self):
        return reverse('time-detail', kwargs={'pk':self.pk})
