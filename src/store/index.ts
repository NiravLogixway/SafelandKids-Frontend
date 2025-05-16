import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// Create saga middleware using require
const createSagaMiddleware = require('redux-saga').default;
const sagaMiddleware = createSagaMiddleware();

// Create logger middleware for development
const logger = createLogger({
  collapsed: true,
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false})
      .concat(sagaMiddleware)
      .concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
