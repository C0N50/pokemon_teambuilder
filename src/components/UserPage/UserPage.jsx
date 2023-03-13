import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import CreatedTeamsByUserList from '../CreatedTeamsByUserList/CreatedTeamsByUserList';
import TeamList from '../TeamList/TeamList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM

  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h1>Teams</h1>

      <CreatedTeamsByUserList />

      <Button variant='contained'>
        <Link className="navLink" to="/teamEdit">
          Edit
        </Link>
      </Button>

    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
