import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchcreatedTeamsByUserList() {
    try {
        // console.log('in list of teams');
        const response = yield axios.get(`/team/`);
        yield put ({ type : "SET_CREATED_LIST", payload : response.data })
        
    } catch (error) {
        console.log("Get Created List request failed", error);
    }

}

function* createdTeamsByUserListSaga() {
    yield takeLatest('FETCH_CREATED_LIST', fetchcreatedTeamsByUserList);
  }

export default createdTeamsByUserListSaga;