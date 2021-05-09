import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import postReducer from "./PostReducer";

const createRootReducer = history  => combineReducers({
    router: connectRouter(history),
    post: postReducer,
});

export default createRootReducer;