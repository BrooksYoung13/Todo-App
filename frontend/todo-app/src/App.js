import React, { Component } from 'react';
//import CounterButton from './Components/counter/CounterButton'
//import Counter from './Components/counter/Counter'
import TodoApp from './Components/todo/TodoApp'
import './App.css';
import './bootstrap.css';
 
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*with by value we need curly braces for numbers so it knows its a jsx expression*/}

        {/*<Counter/>*/}
        <TodoApp/>

      </div>
    );
  }
}

/*
class LearningComponents extends Component
{
  render()
  {
    return (
      <div className="LearningComponents">
        My hello world
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>

      </div>
    );
  }
}
*/



export default App;
