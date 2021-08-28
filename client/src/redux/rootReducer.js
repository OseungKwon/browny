import {combineReducers} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
// slices
import authReducer from './slices/auth';
import blogReducer from './slices/blog';
import userReducer from './slices/user';

// ----------------------------------------------------------------------
const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  user: userReducer,
});

export { rootPersistConfig, rootReducer };
