import React from 'react';
import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <>
      <h1 className='about-page-title'>How To Use Pokemon Team Builder</h1>

      <div className="about-page-style-container">
        <div>
          <p className='paragraph'>Welcome to the Pokemon Team Builder application!
            The Pokemon Team Builder app is designed to house competitive resources in one comprehensive application
            to provide a one stop shop for learning,
            team building, and analytics. This help page is written as a brief tutorial and quickstart guide to the core functions
            and features of the team builder application.</p>


          <p className='paragraph'> To use the Pokemon Team Builder application you first must register with a user name and password.
          Although there are technically no password requirements, it is advised the the password be of at least 8 characters and contain
          a mix of Capital & lowercase letters, numbers, and symbols.  
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
