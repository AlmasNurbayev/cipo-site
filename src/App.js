import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './/styles/App.css';
import Header from './components/Header';
import Features from './components/Features';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NewGoods from './components/NewGoods';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {

  const outerTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#a04020',
        dark: '#c35122',
        light: '#deac9b',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });


  return (

    <div className="App">
      <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={outerTheme}>
          <Header />
          <NewGoods />
          <Counter />
        </ThemeProvider>
      </Provider>
      </React.StrictMode>
    </div>
  );
}

export default App;
