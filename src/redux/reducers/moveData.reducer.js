const moveData = (state = {}, action) => {
    switch (action.type) {
      case 'SET_MOVE_DATA':
        return action.payload;
    //   case 'ADD_MOVE_DATA':
    //     return {...state,  action.payload};
      case 'REMOVE_MOVE_DATA':
        return state.filter(element => element !== action.payload);
      case 'DELETE_MOVE_DATA':
        return {};
      default:
        return state;
    }
  }

  export default moveData;