import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import allPokemonList from './pokemonList.reducer';
import teamList from './teamList.reducer';
import createdTeamsByUser from './createdteamsbyuser.reducer';
import selectedTeam from './selectedTeam.reducer';
import typeList from './type.reducer';
import selectedPokemon from './selectedPokemon.reducer';
import moves from './moves.reducer';
import moveData from './moveData.reducer';
import sortedTeam from './sortedTeams.reducer';
import analysisTeam from './analysisTeam';
import loadingReducer from './loading.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  allPokemonList,
  teamList,
  createdTeamsByUser,
  selectedTeam,
  typeList,
  selectedPokemon,
  moves,
  moveData,
  sortedTeam,
  analysisTeam,
  loadingReducer,
  // currentTeam, //holds list of all pokemon
});

export default rootReducer;
