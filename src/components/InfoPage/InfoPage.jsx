import React from 'react';
import './InfoPage.css'

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h1 className='title'>Pokemon Team Builder Info</h1>

      <div className='info-paragraph'>Authored by: Connor Cloud Ferris</div>
      <div className='info-paragraph'>Alias: C0N50</div>
      <div className='info-paragraph'>Copyright: 2023 </div>
      <div className='info-paragraph'>Technologies Used: React, Redux, Express, Node, PokeAPI  </div>
      <div className='info-paragraph'>Thanks to External Parties: PokeAPI, Bulbapedia, Pokemon DB, Marriland  </div>
      <div className='info-paragraph'>Special Thanks: Alyssa, Maryann, Richard, Anna, All my classmates and instructors, and you, the user.</div>

      
    </div>
  );
}

export default InfoPage;
