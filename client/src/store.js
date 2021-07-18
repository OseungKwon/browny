import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'


export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};//초기값

const middlewares = [sagaMiddleware, routerMiddleware(history)];
const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

//개발환경에서만 설정
const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devTools || compose;

const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
)

sagaMiddleware.run(rootSaga);

export default store;