const selectedTeam = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_TEAM':
      return action.payload;
    case 'ADD_SELECTED_POKEMON':
      return [...state, action.payload];
    case 'DELETE_SELECTED_POKEMON':
      return state.filter(element => element !== action.payload);
    case 'DELETE_SELECTED_TEAM':
      return [];
    default:
      return state;
  }
}

export default selectedTeam;