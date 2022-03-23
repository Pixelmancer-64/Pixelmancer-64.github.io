import React, {Component} from 'react';
import './App.css';
import Pokedex from './Pokedex';
import Button from './Button';

class App extends Component {
  render(){
    return <div className='App'>
    <Pokedex/>
    <Button/>
    </div>
  }
}

export default App;
