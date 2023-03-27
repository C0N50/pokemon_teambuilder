import React from 'react';
import './AboutPage.css'

import { useHistory } from 'react-router-dom';

//MUI Components
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';


// The About Page displays a tutorial to the user guiding them through comprehensive usage of the app.
function AboutPage() {

  const onLogin = (event) => {
    history.push('/login');
  };

  const pikachuImageURL = `https://img.pokemondb.net/artwork/large/pikachu.jpg`;
  const electric = 'ElectricIC_SV.png'
  const electricMove = `./Electric_Background.png`
  const normalMove = `.Normal_Background.png`
  const waterMove = `./Water_Background.png`
  const darkMove = `./Dark_Background.png`


  const history = useHistory();


  return (
    <>
      <h1 className='about-page-title'>How To Use Pokemon Team Builder</h1>

      <div className="about-page-style-container">
        <div>
          <p className='paragraph'>Welcome to the Pokemon Team Builder application!
            The Pokemon Team Builder app is designed to house competitive resources in a comprehensive application
            to provide one stop for learning,
            team building, and analytics. This help page is written as a brief tutorial and quickstart guide to the core functions
            and features of the team builder application.
          </p>


          <p className='paragraph'> To use the Pokemon Team Builder application you must first register with a user name and password.
            Although there are technically no password requirements, it is advised to choose a password of at least 8 characters and containing
            a mix of capital & lowercase letters, numbers, and symbols.
          </p>

          <RegisterForm />
        </div>
      </div>

      <div className='about-page-login-button'>
        <Button variant='contained' onClick={onLogin}>
          Login
        </Button>
      </div>


      <div className="about-page-style-container">
        <div id='landing-page-description'>
          <p>
            After Logging in you will be directed to a landing page.
          </p>
          <p>
            The landing page contains a list of all the teams you create.
          </p>
          <p>
            To Create a team press the Create New Team button.
          </p>
        </div>
      </div>

      <div className='about-page-login-button'>
        <Button variant='contained'>
          Create New Team
        </Button>
      </div>

      <div className="about-page-style-container">
        <div id='landing-page-description'>
          <p>
            The Create New Team Button fetches a list of pokemon to be added to your team.
          </p>
        </div>
      </div>


      <div className='pikachu-exaple-container'>
        <Card sx={{
          boxShadow: 2,
          width: 400
        }}>
          <CardContent>
            <Typography variant="h6" component="div">
              Pikachu
            </Typography>
            <CardMedia sx={{
              height: 100,
              width: '100%',
              backgroundSize: 'contain',
            }} image={pikachuImageURL} />
          </CardContent>
          <CardActions>
            <Button variant='contained' size="medium">Add</Button>
            <Button size="small">Details</Button>
          </CardActions>
        </Card>
      </div>


                 <div className="about-page-style-container">
        <div id='landing-page-description'>
          <p>
            Each pokemon's add button creates a list that can hold up to a full team of six pokemon.
          </p>
        </div>
      </div>


      <div className='pikachu-exaple-container'>
        <Card sx={{
          width: 400,
          boxShadow: 3
        }}>
          <CardContent>

            <Typography variant="h6" component="div">
              Pikachu
            </Typography>

            <div className='type-flex-style'>
              <CardMedia className='pokemon-image-style' sx={{
                height: 20,
                width: '45%',
                backgroundSize: 'contain',
              }} image={electric}
              />
            </div>
            <CardMedia className='pokemon-image-style' sx={{
              height: 100,
              width: '100%',
              backgroundSize: 'contain',
            }} image={pikachuImageURL} />

            <div className='move-flex-style'>
              <Typography className='Move-1' variant="caption">
                <div className='move-body'>
                  <>
                    <div className='move-container'>
                      <div><img width='100%' src={electricMove} /></div>
                      <div className='move-text'>Volt Tackle</div>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className='Move-2' variant="caption">
                <div className='move-body'>
                  <>
                    <div className='move-container'>
                      <div><img width='100%' src={normalMove} /></div>
                      <div className='move-text'>Extreme Speed</div>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className='Move-3' variant="caption">
                <div className='move-body'>
                  <>
                    <div className='move-container'>
                      <div><img width='100%' src={waterMove} /></div>
                      <div className='move-text'>Surf</div>
                    </div>
                  </>
                </div>
              </Typography>
              <Typography className='Move-4' variant="caption">
                <div className='move-body'>
                  <>
                    <div className='move-container'>
                      <div><img width='100%' src={darkMove} /></div>
                      <div className='move-text'>Knock Off</div>
                    </div>
                  </>
                </div>
              </Typography>
            </div>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </div>









 

    </>
  );
}

export default AboutPage;
