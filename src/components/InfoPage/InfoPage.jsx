import React from 'react';
import './InfoPage.css'

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <>
      <h1 className='title'>Information & Credits</h1>

      <center>
        <img width='80%' src='pokedex-info.png' />
      </center>
    </>
  );
}

export default InfoPage;
