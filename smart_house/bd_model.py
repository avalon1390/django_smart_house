from django.db import models


# Create your models here.

class Users(models.Model):
    login = models.CharField(max_length=15, primary_key=True)
    password = models.CharField(max_length=20)




class Device_spec(models.Model):
    type = models.CharField(max_length=20, primary_key=True)
    data_format = models.CharField(max_length=10)
    data_modificator = models.CharField(max_length=30)




class Devices(models.Model):
    serial = models.IntegerField(primary_key=True)
    device_password = models.IntegerField()
    login = models.ForeignKey(Users)
    type = models.ForeignKey(Device_spec)




class Indication(models.Model):
    serial = models.ForeignKey(Devices)
    indication = models.IntegerField()
    arrival_time = models.DateTimeField()

