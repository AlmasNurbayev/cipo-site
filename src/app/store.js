import { configureStore } from '@reduxjs/toolkit';
//import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query'
import counterReducer from '../features/counter/counterSlice';
import { productApi } from './product.api';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [productApi.reducerPath]: productApi.reducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware) 
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
