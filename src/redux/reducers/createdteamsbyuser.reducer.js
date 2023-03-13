const createdTeamsByUser = (state = [], action) => {
    switch (action.type) {
        case 'SET_CREATED_LIST':
          return action.payload;
        default:
          return state;
      }
}

export default createdTeamsByUser;