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

  axios.get(`https://pokeapi.co/api/v2/move/`, rejectUnauthenticated)
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

  console.log('in get :apiURL')


  let MOVEAPIURL = 'https://pokeapi.co/api/v2/move/' + req.query.paramsURL;


  axios.get(MOVEAPIURL, rejectUnauthenticated)
    .then(response => {
      console.log(response.data);

      sendObject = {
        name : response.data.name,
        type : response.data.type.name,
        effect : response.data.effect_entries,
        power : response.data.power,
        accuracy : response.data.accuracy
      };


      res.send(sendObject);
    })
    .catch(err => {
      // console.log(err);
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
