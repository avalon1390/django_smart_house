# -*- coding: utf-8 -*-
import json
from django.http import HttpResponse, HttpResponsePermanentRedirect
from django.template import Context, loader
from django.shortcuts import render
from db_model.models import Users, Device_spec, Devices, Indication
from smart_house.device import *


def home_page(request):
    template = loader.get_template('login.html')
    print('1')
    print(Users.objects.get(login='Max').password)
    #return HttpResponse(template.render())
    return render(request,'login.html',{})

def login(request):
    user_login = 'Max'
    user_password = '321'
    print (user_login)
    print(user_password)
    print (Users.objects.get(login=user_login).password)
    lista = Devices.objects.filter(login=user_login).values('serial')
    posts = []
    for sensor in lista:
        sensor_type=Devices.objects.get(serial=sensor['serial']).type_id
        post = set(processing_data(get(), sensor_type), sensor['serial'],sensor_type)  # write data to database
        posts.append(post)  # create list of: sensor type + time + sensor data
    print(posts)

    if (Users.objects.get(login=user_login).password==user_password):  # password digest



        return HttpResponse(json.dumps(posts))



