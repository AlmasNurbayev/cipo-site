import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import Features from './components/Features';

function App() {
  return (
    <div className="App">
        <Header/>
        


        <Counter />
    </div>
  );
}

export default App;
