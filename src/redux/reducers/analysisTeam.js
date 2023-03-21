const analysisTeam = (state = [], action) => {
    switch (action.type) {
      case 'SET_ANALYSIS_TEAM':
        return action.payload;
      case 'CLEAR_ANALYSIS_TEAM':
        return [];
      default:
        return state;
    }
  }
  
  export default analysisTeam;