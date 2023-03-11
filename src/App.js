import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './/styles/App.css';
import Header from './components/Header';
import Features from './components/Features';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import NewGoods from './components/NewGoods';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {


  return (

    <div className="App">
      <React.StrictMode>
      <Provider store={store}>
        
          <Header />
          <NewGoods />
          <Counter />
        
      </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
