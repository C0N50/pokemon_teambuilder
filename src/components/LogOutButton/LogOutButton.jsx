import React from 'react';
import { useDispatch } from 'react-redux';

function LogOutButton(props) {
  const dispatch = useDispatch();


  const handleLogOut = () => {


    dispatch ({ type : 'CLEAR_ANALYSIS_TEAM' })

    dispatch ({type : 'CLEAR_SELECTED POKEMON'})

    dispatch ({type : 'DELETE_SELECTED_TEAM'})

    dispatch ({ type : 'CLEAR_SORTED_TEAMS'})

    dispatch ({ type : 'CLEAR_TEAM_LIST'})

    dispatch({ type: 'LOGOUT' })

  }

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={handleLogOut}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
