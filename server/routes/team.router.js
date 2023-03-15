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

  queryText = `SELECT "user".username, "team".id, "team".team_name, "team_pokemon".api_pokemon_id FROM "user"
  JOIN "team" ON "team".user_id = "user".id
  JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
  WHERE  "user".id=$1
  GROUP BY "user".username, "team".id, "team".team_name, "team_pokemon".api_pokemon_id;
  `;

  const userParam = req.user.id;

  // const idParam = req.params.id;

  pool
    .query(queryText, [userParam])
    .then((result) => {

      // console.log(result.rows[0].username);

      const endpointsArray = result.rows.map((pokemonid) => {
        return `https://pokeapi.co/api/v2/pokemon/${pokemonid.api_pokemon_id}`
      })

      console.log(endpointsArray);

      let urlArray = [];
      let promiseArray = [];

      for (let endpoint of endpointsArray) {
        urlArray.push(endpoint);
      }

      for (let url of urlArray) {

        console.log('url:', url);
        const promise = axios.get(url);
        promiseArray.push(promise);
      }



      // let URL1 = endpointsArray[0];
      // let URL2 = endpointsArray[1];
      // let URL3 = endpointsArray[2];
      // let URL4 = endpointsArray[3];
      // let URL5 = endpointsArray[4];
      // let URL6 = endpointsArray[5];

      // const promise1 = axios.get(URL1);
      // const promise2 = axios.get(URL2);
      // const promise3 = axios.get(URL3);
      // const promise4 = axios.get(URL4);
      // const promise5 = axios.get(URL5);
      // const promise6 = axios.get(URL6);


      Promise.all(promiseArray).then(function (values) {
        // console.log(values[0].data);

        let valuesArray = [];

        for (let value of values) {
          // console.log(value.data);
          valuesArray.push(value.data);
        }

        // console.log('values Array', valuesArray);

        console.log(result.rows);

        for (let i = 0; i < valuesArray.length; i++) {
          valuesArray[i]["metaData"] = result.rows[i];
        }



        let myJsonString = JSON.stringify(valuesArray);

        res.send(myJsonString);
      })
        .catch((error) => {
          console.log('Error making SELECT for secrets:', error);
          res.sendStatus(500);
        });
      // GET route code here
    })
})





/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {

  // console.log(req.body);

  console.log('team_name', req.body.MetaData.team_name);
  console.log('user_id', req.body.MetaData.user_id);
  console.log('apiIDArray', req.body.apiIdArray)

  const classQueryText = `
  INSERT INTO "team" ("team_name", "user_id")
  VALUES ($1, $2) ON CONFLICT (id) DO UPDATE 
  SET id = excluded.id
  RETURNING "id";
`
  pool.query(classQueryText, [req.body.MetaData.team_name, req.body.MetaData.user_id])
    .then(result => {
      console.log('New Team ID', result.rows[0].id);

      const queryParams = [result.rows[0].id];

      let api_idArray = req.body.apiIdArray;

      for (api_id of api_idArray) {
        queryParams.push(api_id.api_pokemon_id);
      }

      console.log('queryParams', queryParams);

      while (queryParams.length < 7) {
        queryParams.push(201);
      }

      console.log('queryParams', queryParams);

      const pokemonApiIDs = `
          INSERT INTO "team_pokemon" ("team_id", "api_pokemon_id")
          VALUES ($1, $2), ($1, $3), ($1, $4), ($1, $5), ($1, $6), ($1, $7);
      `

      pool.query(pokemonApiIDs, queryParams)
        .then(result => {
          res.sendStatus(201);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500)
        })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500)
    })
});


router.delete('/:id', rejectUnauthenticated, (req, res) => {

  const userId = req.user.id;
  const teamId = req.params.id;
  console.log('in Delete Team')
  console.log('TeamID', teamId);
  console.log('userId', userId)

  const queryText = `DELETE FROM "team" WHERE "id" = $1 AND "user_id" = $2;`;
  pool
    .query(queryText, [teamId, userId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`error in delete`, error);
      res.sendStatus(500);
    })
});

module.exports = router;
