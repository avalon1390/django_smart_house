# -*- coding: utf-8 -*-
import json
from django.http import HttpResponse
from django.shortcuts import render
from db_model.models import Users
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
