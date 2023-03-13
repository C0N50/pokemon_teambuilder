import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createdTeamsByUserList() {
    try {
        console.log('in list of teams');
        const response = yield axios.get(`/team/`);
        yield put ({ type : "SET_CREATED_LIST", payload : response.data })
        
    } catch (error) {
        console.log("Get Created List request failed", error);
    }

}

function* CreatedTeamsByUserListSaga() {
    yield takeLatest('FETCH_CREATED_LIST', createdTeamsByUserList);
  }

export default CreatedTeamsByUserListSaga;