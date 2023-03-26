import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@mui/material/Button';
import './RegisterPage.css'

function RegisterPage() {
  const history = useHistory();

  return (
    <div>

      <center>
          <img className='mew-image' width='30%' height='auto' src='Shiny-Mew.png' />

        <RegisterForm />

        <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
