import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@mui/material/Button';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="login-page-wrapper">

      <div className='mewtwo-wrapper'>
        <img className='mew-image' width='20%' height='auto' src='Pikachu-Transparent-Background.png' />
      </div>

      <RegisterForm />

      <center>
        <Button className="btn btn_sizeSm" onClick={onLogin}>
          Login
        </Button>
      </center>

    </div>
  );
}

export default LandingPage;
