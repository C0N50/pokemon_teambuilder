const moves = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_MOVES':
        return action.payload;
      case 'ADD_MOVE':
        return [...state, action.payload];
      case 'DELETE_MOVE':
        return state.filter(element => element !== action.payload);
      case 'DELETE_ALL_MOVES':
        return [];
      default:
        return state;
    }
  }
  
  export default moves;