import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* changeTeamName(action) {
    try {
      // console.log("in change team name, action is,", action);
      yield axios.put(`/team/${action.payload.id}`, {
        payload: action.payload.name
      });
      yield put({ type: "FETCH_TEAM_LIST" });
    } catch (error) {
      console.log("Change Team Name PUT request failed", error);
    }
  }


  function* changeTeamNameSaga() {
    yield takeLatest("CHANGE_TEAM_NAME", changeTeamName);
  }


  export default changeTeamNameSaga;