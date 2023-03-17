const selectedPokemon = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_POKEMON':
        return action.payload;
      case 'CLEAR_SELECTED POKEMON':
        return {};
      default:
        return state;
    }


  };
  
  // user will be on the redux state at:
  // state.user
  export default selectedPokemon;