import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appReducer from './features/appSlice';

const keyStore = 'alexandria-v1';

const persistConfig = {
  key: keyStore,
  storage,
  whitelist: ['app'],
  blacklist: []
};

const rootReducer = combineReducers({
  app: appReducer
});

const middlewares = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST']
  },
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'production' ? false : {
    name: keyStore
  },
  middleware: middlewares
});

export const persistor = persistStore(store);
export default store;