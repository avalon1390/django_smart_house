from django.shortcuts import render_to_response
import json
from django.http import HttpResponse, HttpResponsePermanentRedirect
from django.template import Context, loader
# Create your views here.
from .models import Users, Device_spec, Devices, Indication
from django.shortcuts import render


def home_page(request):
    template = loader.get_template('login.html')
    print('1')
    print(Users.objects.get(login='Max').password)
    #return HttpResponse(template.render())
    return render(request,'login.html',{})

def login(request,a,b):
    user_login = a
    user_password = b
    print (user_login)
    print(user_password)
    print (Users.objects.get(login=user_login).password)

    if (Users.objects.get(login=user_login).password==user_password):  # password digest

        print(json.dump(HttpResponsePermanentRedirect("/"+user_login+"/")))
        """socketio.emit('my response', {'room':user_login}, namespace='/test')"""
        return json.dump(HttpResponsePermanentRedirect("/"+user_login+"/"))
