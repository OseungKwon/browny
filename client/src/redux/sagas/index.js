import { all, fork } from 'redux-saga/effects';
import axios from "axios";
import postSaga from './postSaga';

export default function* rootSaga() {
    yield all([fork(postSaga)]);
}