const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {

  axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1010`, rejectUnauthenticated)
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })

  // GET route code here
});

router.get('/apiURL', (req, res) => {

  //Both variables below are dependent on inputs from the "handleAdd" function in AllPokemonItem.jsx

  //APIURL fetches the pokemon by ID.

  let APIURL = req.query.paramsURL;

  // console.log('APIURL', req.query.paramsURL);


  //Fall Back URL to use while POKEAPI IDs are wrong. 
  //This variable is interchangable with the API URL in the axios call depending on how functional the pokemon API is.

  let pokemonNameURL = `https://pokeapi.co/api/v2/pokemon/${req.query.paramsURL}`




  axios.get(pokemonNameURL, rejectUnauthenticated)
    .then(response => {
      // console.log(response.data);
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
  // GET route code here
});



/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
