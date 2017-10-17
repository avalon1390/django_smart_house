import React, { Component } from 'react';
import { connect } from 'react-redux';

//delete cookies
function deleteCookie(name) {
   let date = new Date(); // Take the current date
   date.setTime(date.getTime() - 1); // We return to the "past"
   document.cookie = name += `=; expires=${date.toGMTString()}`; // Set the cookie to a null value and expire before the elapsed time
}


//exit to start page
function logOut() {

        deleteCookie("logged_in");
        window.location.href = "/logout/";
}


// react component: button, label
class App extends Component {
  exit() {
  console.log("exit");
      logOut();
  }
  render() {
    console.log(this.props.testStore);
    return (
      <div>
        <button onClick={this.exit.bind(this)}>Exit</button>
        <ul>
          {this.props.testStore.map((track, index) =>
            <li key={index}>{track}</li>
          )}
        </ul>
      </div>
    );
  }
}


//export state of redux
export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({})
)(App);