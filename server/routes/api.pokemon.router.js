const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {

  axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
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
