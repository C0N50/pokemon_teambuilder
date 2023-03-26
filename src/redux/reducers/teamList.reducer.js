const teamList = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEAM_LIST':
      return action.payload;
    case 'CLEAR_TEAM_LIST':
      return [];
    default:
      return state;
  }
}

export default teamList;