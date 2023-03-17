import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Fetches List of User Created Team For User Front Page
 */
function* fetchTypeList() {
    try {
        console.log('in list of teams');
        const response = yield axios.get(`/type`);
        yield put({ type: "SET_TYPE_LIST", payload: response.data })

    } catch (error) {
        console.log("Get Team List request failed", error);
    }
}

function* typeListSaga() {
    yield takeLatest('FETCH_TYPE_LIST', fetchTypeList);
}

export default typeListSaga;