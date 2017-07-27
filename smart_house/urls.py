# -*- coding: utf-8 -*-
from django.conf.urls import *
from smart_house.views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$', home_page),
    url(r'^login/$', login),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

'''url(r'^login/(?P<a>)/(?P<b>)/', login),'''