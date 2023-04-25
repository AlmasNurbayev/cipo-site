import { configureStore } from '@reduxjs/toolkit';
//import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query'
//import counterReducer from '../features/counter/counterSlice';
import { newsIDApi, productApi } from './product.api';
import { newsApi } from './product.api';
import { storesApi } from './product.api';
import { filtersApi } from './product.api';
import { productsApi } from './product.api';
import { subscribeApi, subscribeGetApi } from './subscribe.api';
import { productIDApi } from './product.api';
import userReducer from './slices/userSlice'
import { clientApi } from './client.api';
//import {userSlice} from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
    [productIDApi.reducerPath]: productIDApi.reducer,
    [newsIDApi.reducerPath]: newsIDApi.reducer,
    [subscribeGetApi.reducerPath]: subscribeGetApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(productApi.middleware)
    .concat(newsApi.middleware)
    .concat(storesApi.middleware)
    .concat(filtersApi.middleware)
    .concat(productsApi.middleware)
    .concat(subscribeApi.middleware)
    .concat(productIDApi.middleware)
    .concat(newsIDApi.middleware)
    .concat(subscribeGetApi.middleware)
    .concat(clientApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
