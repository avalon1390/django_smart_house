import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/app';
import sensorsData from './reducers/app'
import { message, open, socket } from './controls/app'


//MAIN

if (socket.readyState == WebSocket.OPEN) socket.onopen();
socket.onmessage = message;
socket.onopen = open;




// import Immutable from 'immutable'  ????????????

//MAIN
export const store = createStore(sensorsData);


// MAIN
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
