import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'
import Button from '@mui/material/Button';

function LoginPage() {
  const history = useHistory();

  return (
    <div className='login-page-wrapper'>

      <div className='mewtwo-wrapper'>
        <img className='mew-image' width='35%' height='auto' src='Mewtwo.png' />
      </div>

      <div className='login-wrapper'>
        <LoginForm />
        <center>
          <Button
            variant='contained'
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
        </center>
      </div>



    </div>

  );
}

export default LoginPage;
