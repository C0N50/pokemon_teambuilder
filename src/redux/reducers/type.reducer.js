const typeList = (state = [], action) => {
    switch (action.type) {
        case 'SET_TYPE_LIST':
          return action.payload;
        default:
          return state;
      }
}

export default typeList;