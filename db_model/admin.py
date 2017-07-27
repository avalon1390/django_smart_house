from django.contrib import admin

# Register your models here.

from .models import Users, Device_spec, Devices, Indication

admin.site.register(Users)
admin.site.register(Device_spec)
admin.site.register(Devices)
admin.site.register(Indication)


