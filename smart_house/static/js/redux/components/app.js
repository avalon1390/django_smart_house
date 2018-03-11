import React, { Component } from 'react';
import { connect } from 'react-redux';






// react component: button, label
class App extends Component {

  render() {
    console.log(this.props.testStore);
    return (
      <div>
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
