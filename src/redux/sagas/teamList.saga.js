import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Fetches List of User Created Team For User Front Page
 */
function* fetchTeamList() {
    try {
        console.log('in list of teams');
        const response = yield axios.get(`/team/`);
        yield put ({ type : "SET_TEAM_LIST", payload : response.data })
        
    } catch (error) {
        console.log("Get Team List request failed", error);
    }

}

function* teamListSaga() {
    yield takeLatest('FETCH_TEAM_LIST', fetchTeamList);
  }

export default teamListSaga;