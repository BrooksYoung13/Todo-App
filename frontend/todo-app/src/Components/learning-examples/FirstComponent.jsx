import React, { Component } from 'react';
//New Class component
//Must extend component on class definition
//Must implement render method
//Include it as part of the 'root' or 'App' component above

//Default export, can import this into App.js without curly braces, need curly braces for other classes in this module
class FirstComponent extends Component {
    render() {
      return (
        <div className="App">
          First Component.....
        </div>
      );
    }
  }

  export default FirstComponent
