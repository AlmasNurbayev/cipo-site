import React from 'react';
//import logo from './logo.svg';
//import { Counter } from './features/counter/Counter';
import './/styles/App.css';
//import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';
import { store } from './app/store';
import { RouterProvider } from 'react-router-dom';
//import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/router';
import './firebase';




function App() {


  return (

    <div className="App">
      <React.StrictMode>
        <Provider store={store}>
          <RouterProvider router={publicRoutes} />
          {/* <Routes>
            {publicRoutes.map((route, index) =>
              <Route element={route.element} path={route.path} exact={route.exact} key={'pr' + index} />
            )}
          </Routes> */}


        </Provider>

      </React.StrictMode>
    </div>
  );
}

export default App;
