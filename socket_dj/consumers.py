from channels import Group
import time
from db_model.models import Devices
from smart_house.device import *


# add channel
def ws_add(message,room_name):
    message.reply_channel.send({"accept": True})
    Group(room_name).add(message.reply_channel)

# send message on channel
def ws_message(message,room_name):
    time.sleep(5)
    lista = Devices.objects.filter(login=room_name).values('serial')
    posts = ''
    for sensor in lista:
        sensor_type = Devices.objects.get(serial=sensor['serial']).type_id
        post = set(processing_data(get(), sensor_type), sensor['serial'], sensor_type)  # write data to database
        posts=posts +'$'+ post  # create list of: sensor type + time + sensor data
    print(posts)
    Group(room_name).send(
         {
            "text": "%s" % posts,
        }
     )

# disconnect

def ws_disconnect(message,room_name):
    print('3')
    Group(room_name).discard(message.reply_channel)