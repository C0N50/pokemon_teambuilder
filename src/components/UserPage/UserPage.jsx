import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './UserPage.css'

import CreatedTeamsByUserList from '../CreatedTeamsByUserList/CreatedTeamsByUserList';
import TeamList from '../TeamList/TeamList';

function UserPage() {

  const user = useSelector((store) => store.user);

  //Displays Users landing page. Including Create team button and all teams user has created.
  return (
    <div className="container">

      <div className='teams-title'>
      <img src="Teams-unown.png" width="40%" height="auto"/>
      </div>

      <div className='create-team-button'>
        <Button variant='contained' component={Link} to="/teamEdit">
          Create New Team
        </Button>
      </div>

      <div>
        <CreatedTeamsByUserList />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
