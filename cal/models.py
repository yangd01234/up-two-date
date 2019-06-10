from django.db import models
from django.contrib.auth.models import User
import datetime

class Time(models.Model):
    title = models.CharField(max_length=30)
    color = models.CharField(default='#000000', max_length=7)
    start_time = models.TimeField(default=datetime.time(00,00))
    end_time = models.TimeField(default=datetime.time(00,00))
    # one to many relationship, if user gets deleted, time gets deleted
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
