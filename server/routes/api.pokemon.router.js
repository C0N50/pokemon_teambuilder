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

  axios.get(`https://pokeapi.co/api/v2/pokemon?limit=251`, rejectUnauthenticated)
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

router.get('/apiURL', (req, res) => {

  console.log('in get :apiURL')
  console.log('req.query.paramsURL', req.query.paramsURL);

  let APIURL = req.query.paramsURL;


  axios.get(APIURL, rejectUnauthenticated)
    .then(response => {
      console.log(response.data);
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
