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
router.get('/', rejectUnauthenticated, (req, res) => {
    // what is the value of req.user????
    console.log('req.user:', req.user);
  
      queryText = `SELECT "team".team_name, "team_pokemon".api_pokemon_id FROM "user"
      JOIN "team" ON "team".user_id = "user".id
      JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
      WHERE  "user".id=$1
      GROUP BY "user".username, "team".team_name, "team_pokemon".api_pokemon_id;`
  
      queryParam = req.user.id;
  
        pool
        .query(queryText, [queryParam])
        .then((results) => res.send(results.rows))
        .catch((error) => {
          console.log('Error making SELECT for secrets:', error);
          res.sendStatus(500);
        });

  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
