import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './UserPage.css'


import CreatedTeamsByUserList from '../CreatedTeamsByUserList/CreatedTeamsByUserList';

function UserPage() {

  const user = useSelector((store) => store.user);

  //Displays Users landing page. Including Create team button and all teams user has created.
  return (
    <div className="container">

      <div className='teams-title'>
        <div >
          <img src="Teams-unown.png" width="30%" height="auto" />
        </div>

        <div>
          <Button variant='contained' component={Link} to="/teamEdit">
            Create New Team
          </Button>
        </div>
      </div>

      <div>
        <CreatedTeamsByUserList />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
