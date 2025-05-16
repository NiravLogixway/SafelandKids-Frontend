import {combineReducers} from '@reduxjs/toolkit';
import appReducer from '@/modules/App/store/appReducer';
import authReducer from '@/modules/Auth/store/authReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

export default rootReducer;
