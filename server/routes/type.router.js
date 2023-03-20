const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {

  // console.log('in get /type')

  const queryText = `SELECT * FROM "pokemon_type";`;

  pool.query(queryText)
    .then(result => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      // console.log(err);
      res.sendStatus(500)
    })

});

module.exports = router;



