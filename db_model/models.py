from django.db import models

# BD models for creating tables in Postgres.

#class Users(models.Model):
#    login = models.CharField(max_length=15, primary_key=True)
#    password = models.CharField(max_length=20)

class Device_spec(models.Model):
    type = models.CharField(max_length=20, primary_key=True)
    data_format = models.CharField(max_length=10,default="")
    data_modificator = models.CharField(max_length=30,default="")

#class Devices(models.Model):
#    serial = models.IntegerField(primary_key=True)
#    device_password = models.IntegerField()
#    login = models.ForeignKey(Users,on_delete=models.DO_NOTHING,)
#    type = models.ForeignKey(Device_spec,on_delete=models.DO_NOTHING,)

class Indication(models.Model):
    device = models.CharField(max_length=30,default="")
    indication = models.CharField(max_length=30,default="")
    arrival_time = models.DateTimeField(primary_key=True)

class Indication_stream(models.Model):
    device = models.CharField(max_length=30,default="")
    indication = models.CharField(max_length=30,default="")
    arrival_time = models.DateTimeField(primary_key=True)
