import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { MuiDrawer } from '../Drawer/Drawer';
import { SmallDrawer } from '../SmallDrawer/SmallDrawer';

//Material UI imports
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';




function Nav() {
  const user = useSelector((store) => store.user);

  return (

    <Box className="nav" sx={{ flexGrow: 1, boxShadow: 2 }}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between", flexGrow: 1 }} >

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              {/* <Link className="navLink" to="/user">
                Home
              </Link>

              <Link className="navLink" to="/info">
                Info Page
              </Link> */}

              <MuiDrawer />
            </>
          )}


          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links

            <SmallDrawer />
          )}




          <Link to="/home">
            <img className="nav-title" src='Pokemon-Team-Builder.png' width="500px" height="auto"></img>
          </Link>

          {/* <Link className="navLink" to="/about">
            About
          </Link> */}


          {/* If no user is logged in, show these links */}
          {!user.id && (
            // If there's no user, show login/registration links
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          )}

          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              {/* <Link className="navLink" to="/user">
                Home
              </Link>

              <Link className="navLink" to="/info">
                Info Page
              </Link> */}

              <LogOutButton className="navLink" />
            </>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Nav;
