const allPokemonList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_POKEMON':
          return action.payload;
        default:
          return state;
      }
}

export default allPokemonList;