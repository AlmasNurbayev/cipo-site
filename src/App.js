import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <div className='logo'></div>
        <div className='menu'>
          
        </div>
      </div>



        <Counter />
    </div>
  );
}

export default App;
