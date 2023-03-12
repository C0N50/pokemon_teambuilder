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
  //console.log('req.user:', req.user);

  let sendObject = {};

  queryText = `SELECT "team".team_name, "team_pokemon".api_pokemon_id FROM "user"
      JOIN "team" ON "team".user_id = "user".id
      JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
      WHERE  "user".id=$1
      GROUP BY "user".username, "team".team_name, "team_pokemon".api_pokemon_id;`

  queryParam = req.user.id;

  pool
    .query(queryText, [queryParam])
    .then((result) => {

      console.log(result.rows);

      const endpointsArray = result.rows.map((pokemonid) => {
        return `https://pokeapi.co/api/v2/pokemon/${pokemonid.api_pokemon_id}`
      })

      console.log(endpointsArray);


      let URL1 = endpointsArray[0];
      let URL2 = endpointsArray[1];
      let URL3 = endpointsArray[2];
      let URL4 = endpointsArray[3];
      let URL5 = endpointsArray[4];
      let URL6 = endpointsArray[5];

      const promise1 = axios.get(URL1);
      const promise2 = axios.get(URL2);
      const promise3 = axios.get(URL3);
      const promise4 = axios.get(URL4);
      const promise5 = axios.get(URL5);
      const promise6 = axios.get(URL6);


      Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then(function (values) {
        console.log(values[0].data);

        let valuesArray = [];

        for (let value of values) {
          console.log(value.data);
          valuesArray.push( value.data);
        }

        console.log('values Array', valuesArray);

        let myJsonString = JSON.stringify(valuesArray);

        console.log(valuesArray);

        res.send(myJsonString);

      });

    })
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
