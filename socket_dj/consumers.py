from channels import Group
import simplejson
from db_model.models import Indication

# add channel
def ws_add(message,room_name):
    message.reply_channel.send({"accept": True})
    print('connect')
    Group(room_name).add(message.reply_channel)

# send message on channel
def ws_message(message,room_name):
    lista = Indication.objects.values('device')
    posts = {}

    for sensor in lista:
        indictions = Indication.objects.get(device=sensor['device']).indication
        time_of_receipt = Indication.objects.get(device=sensor['device']).arrival_time
        indictions = indictions.split('/')
        for i in range(len(indictions)):
            indictions[i] = float(indictions[i])
        post = {sensor['device']: {"indication": indictions,"data": time_of_receipt.strftime('%y-%m-%d %H:%M:%S')}}
        posts.update(post)

    print(simplejson.dumps(posts))
    Group(room_name).send(
         {
            "text": simplejson.dumps(posts)
        }
     )

# disconnect

def ws_disconnect(message,room_name):
    print('disconnect')
    Group(room_name).discard(message.reply_channel)