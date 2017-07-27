import random
from db_model.models import Users, Device_spec, Devices, Indication
import datetime



def get():    # data request from sensor
    data=random.randint(1,100)
    return data


def set(indication, serial,type):  # write data in to database

    record=Indication(serial=serial,indication=indication,arrival_time=datetime.datetime.now())

    record.save()
    format_data = Device_spec.objects.get(type=type).data_format

    data=str(serial)+"@"+str(indication)+"@"+str(format_data)+"@"+str(datetime.datetime.now())
    return (data)


def processing_data( data, type):  # processing data from sensor
    #processing_method=getattr(sensorsProcessing, processing)
    processed_data=data * int(Device_spec.objects.get(type=type).data_modificator)
    return processed_data



