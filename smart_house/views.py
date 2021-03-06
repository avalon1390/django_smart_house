# -*- coding: utf-8 -*-
import json
from django.http import HttpResponse, HttpResponsePermanentRedirect
from django.template import Context, loader
from django.shortcuts import render
from db_model.models import Users, Device_spec, Devices, Indication
from smart_house.device import *
from channels import Group
from django.shortcuts import redirect


def home_page(request):
    print(request.session)
    auth=request.session.get('auth','False')
    if (auth=='True'):
        return render(request, 'index.html', {})
    #return HttpResponse(template.render())
    elif (auth=='False'):
        return render(request,'login.html',{})

def login(request):
    user_login=request.GET.get('a','')
    user_password=request.GET.get('b','')
    print(user_login)
    print(user_password)
    if (Users.objects.get(login=user_login).password == user_password):  # password digest
        request.session['auth']='True'
        request.session['login'] = user_login

        return HttpResponse(user_login)

def logout(request):
    del request.session['auth']
    del request.session['login']
    return redirect('/')

def index(request):

    #return HttpResponse(template.render())
    return render(request,'index.html',{})

"""    print (user_login)
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
        Group("chat").send(
            {
                "text": "%s" % posts,
            }
        )
        return HttpResponse(json.dumps(posts))
"""


