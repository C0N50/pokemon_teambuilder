import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


/**
 * Fetches List of all Legal pokemon from PokeApi to be displayed for user during team edit.
 */
function* fetchAllPokemon() {
    try {
        console.log('in fetch all pokemon');
        const response = yield axios.get("/api/pokemon");
        yield put ({ type : "SET_ALL_POKEMON", payload : response.data })
        
    } catch (error) {
        console.log("Pokemon API GET all request failed", error);
    }
}


function* fetchCurrentMoves(action) {
    try {
        console.log('in fetch move data');

        console.log('action.payload fetch current moves', action.payload)
        const response = yield axios.get("/api/move/apiURL/", { params: {paramsURL : action.payload } } );

        console.log('fetch current moves response.data', response.data)

        yield put ({ type : "SET_MOVE_DATA", payload : response.data })
        
    } catch (error) {
        console.log("Pokemon API GET all request failed", error);
    }


}

function* pokeapiSaga() {
    yield takeLatest('FETCH_ALL_POKEMON', fetchAllPokemon);
    yield takeLatest('FETCH_MOVE_DATA', fetchCurrentMoves);
  }


  export default pokeapiSaga;