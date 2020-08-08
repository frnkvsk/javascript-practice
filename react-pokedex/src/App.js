import React from 'react';
import Pokedex from './Pokedex';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h2 className="App-title">Pokedex</h2>
      <div className="App-container">        
        <Pokedex />
      </div>
    </div>
  )
}

export default App;
