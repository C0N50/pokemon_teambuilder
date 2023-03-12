import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchAllPokemon() {
    try {
        console.log('in fetch all pokemon');
        const response = yield axios.get("/api/pokemon");
        yield put ({ type : "SET_ALL_POKEMON", payload : response.data })
        
    } catch (error) {
        console.log("Pokemon API GET all request failed", error);
    }
}

// function* fetchCurrentTeam(action) {
//     try {
//         console.log('in single pokemon');
//         const response = yield axios.get(`/api/pokemon/currentTeam`, action.payload);
//         yield put ({ type : "SET_CURRENT_TEAM", payload : response.data })
        
//     } catch (error) {
//         console.log("Pokemon API GET current Team request failed", error);
//     }
// }


function* pokeapiSaga() {
    yield takeLatest('FETCH_ALL_POKEMON', fetchAllPokemon);
    // yield takeLatest('FETCH_CURRENT_TEAM', fetchCurrentTeam);
  }


  export default pokeapiSaga;