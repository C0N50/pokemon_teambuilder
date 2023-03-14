import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';



/**
 * Posts Current Team from edit page to database to be saved.
 * @param {object} action 
 */
function* postSelectedTeam(action) {
    try {
        console.log('in post', action.paylod);
      yield axios.post("/team", action.payload);
      yield put({ type: "FETCH_TEAM_LIST" });
    } catch (error) {
      console.log("User post request failed", error);
    }
  }



function* selectedTeamSaga() {
    yield takeLatest('POST_SELECTED_TEAM', postSelectedTeam);
  }

export default selectedTeamSaga;