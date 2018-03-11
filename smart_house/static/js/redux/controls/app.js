
import { store } from '../index'
//CONTROLS

export let socket = new WebSocket("ws://" + window.location.host + "/"+"test"+"/");

export function open() {
    socket.send('GET::DATA');
}

// CONTROLS
export function message(e) {
    store.dispatch({ type: 'CLEAR_RECORD', payload: posts });
    let posts = JSON.parse(e.data);
    let say = "";
    for (let device in posts){

        say = "Показания сенсора " + device + " = " + posts[device].indication +  " за " + posts[device].data;
        store.dispatch({ type: 'ADD_RECORD', payload: say });
    }

    socket.send(document.getElementsByName('logged_in')[0].getAttribute('content'));
}
