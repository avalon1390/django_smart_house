from django.contrib import admin

# Register your models here.

from .models import Device_spec, Indication, Indication_stream

admin.site.register(Device_spec)
admin.site.register(Indication_stream)
admin.site.register(Indication)


