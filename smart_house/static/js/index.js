import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './app';


let initialState = [];
let posts = "";

// get login from cookies
function getCookie(name) {
  let r = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  if (r) return r[2];
  else return "";
}

//create socket
var socket = new WebSocket("ws://" + window.location.host + "/"+getCookie("logged_in").replace("=", "")+"/");

//socket channel emitter
socket.onmessage = function(e) {
    posts=""
    store.dispatch({ type: 'CLEAR_RECORD', payload: posts });
    const nonSplitted = e.data.split ('$');
    for(let i = 1;i<nonSplitted.length;i++){
      let words = nonSplitted[i].split('@');
      console.log("Показания сенсора " + words[0] + " = " + words[1] + " " + words[2] + " за " + words[3]);
      posts="Показания сенсора " + words[0] + " = " + words[1] + " " + words[2] + " за " + words[3];
      store.dispatch({ type: 'ADD_RECORD', payload: posts });
    }

    socket.send(getCookie("logged_in"));
}


//the first message when you open a channel
socket.onopen = function() {
    socket.send(getCookie("logged_in").replace("=", ""));
}

if (socket.readyState == WebSocket.OPEN) socket.onopen();


//updating the message on the page
function sensorsData(state = initialState, action) {
  if (action.type == 'ADD_RECORD') {
    return [
      ...state,
      action.payload
    ];
  }
  else if (action.type == 'CLEAR_RECORD') {
    return [action.payload];
  }
  else{
  return state;
  }

}

const store = createStore(sensorsData);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);