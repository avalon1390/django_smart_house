# -*- coding: utf-8 -*-
from django.conf.urls import *
from smart_house.views import *
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
    url(r'^$', home_page),
    url(r'^login/$', login),
    url(r'^index/$', index),
    url(r'^logout/$', logout),

]
urlpatterns += staticfiles_urlpatterns()
'''url(r'^login/(?P<a>)/(?P<b>)/', login),'''