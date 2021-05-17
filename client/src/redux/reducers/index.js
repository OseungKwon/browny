import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import postReducer from "./PostReducer";
import authReducer from './authReducer';
const createRootReducer = history  => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    post: postReducer,
});

export default createRootReducer;