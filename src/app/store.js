import { configureStore } from '@reduxjs/toolkit';
//import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { setupListeners } from '@reduxjs/toolkit/query'
//import counterReducer from '../features/counter/counterSlice';
import { productApi } from './product.api';
import { newsApi } from './product.api';
import { storesApi } from './product.api';
import { filtersApi } from './product.api';
import { productsApi } from './product.api';
import { subscribeApi } from './subscribe.api';


export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [subscribeApi.reducerPath]: subscribeApi.reducer,
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware).concat(newsApi.middleware).concat(storesApi.middleware).concat(filtersApi.middleware).concat(productsApi.middleware).concat(subscribeApi.middleware)
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
