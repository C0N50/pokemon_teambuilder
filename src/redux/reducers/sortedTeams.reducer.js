const sortedTeam = (state = [], action) => {
    switch (action.type) {
      case 'SET_SORTED_TEAMS':
        return action.payload;
      case 'CLEAR_SORTED_TEAMS':
        return [];
      default:
        return state;
    }
  }
  
  export default sortedTeam;