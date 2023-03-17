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

      // console.log(endpointsArray);

      let urlArray = [];
      let promiseArray = [];

      for (let endpoint of endpointsArray) {
        urlArray.push(endpoint);
      }

      for (let url of urlArray) {

        // console.log('url:', url);
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

        // console.log(result.rows);

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


/* Refactored team.router POST route to Databse. 
Instead of a single SQL query the POST now generates uses Await & promises like Edans example from week 15. 
This is to provide returned team_pokemon IDs for the move Database to use for their sql inserts. 
These Ids are also to be used for any other attribute tables that are to reference the team_pokemon table*/

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, async (req, res) => {

  console.log(req.body);

  // console.log('team_name', req.body.MetaData.team_name);
  // console.log('user_id', req.body.MetaData.user_id);
  // console.log('apiIDArray', req.body.apiIdArray)
  // We need to use the same connection for all queries...
  const connection = await pool.connect()
  // Using basic JavaScript try/catch/finally 
  try {
    await connection.query('BEGIN');
    const TeamInsertQueryText = `
    INSERT INTO "team" ("team_name", "user_id")
    VALUES ($1, $2) ON CONFLICT (id) DO UPDATE 
    SET id = excluded.id
    RETURNING "id";
  `
    // Use - amount & from account for withdraw
    const result = await connection.query(TeamInsertQueryText, [req.body.MetaData.team_name, req.body.MetaData.user_id]);
    // Use + amount & to account for deposite
    const newTeamId = result.rows[0].id;

    const apiIDQueryParams = [];
    let api_idArray = req.body.apiIdArray;

    for (api_id of api_idArray) {
      apiIDQueryParams.push(api_id.api_pokemon_id);
    }

    console.log('apiIDQueryParams', apiIDQueryParams);
    console.log('New Team ID', newTeamId);

    const pokemonApiQueryText = `INSERT INTO "team_pokemon" ("team_id", "api_pokemon_id")
        VALUES ($1, $2) ON CONFLICT (id) DO UPDATE 
        SET id = excluded.id
        RETURNING "id";`

    let pokemonResultIDs = [];

    for (let apiIDQuery in apiIDQueryParams) {
      const pokemonResult = await connection.query(pokemonApiQueryText, [newTeamId, apiIDQueryParams[apiIDQuery]]);
      pokemonResultIDs.push(pokemonResult);
    }

    for (let resultID of pokemonResultIDs) {
      console.log('Pokemon Result ID', resultID.rows[0].id);
    }

    const MoveQueryText = `INSERT INTO "pokemon_move" ("name", "team_pokemon_id")
    VALUES ($1, $2);`

    const selectedAttacks = req.body.selected_attacks;
    console.log('selectedAttacks', selectedAttacks);
    
    for (let insertId of pokemonResultIDs) {
      for(atacksIndex in selectedAttacks) {
        if(selectedAttacks[atacksIndex]) {
          for (attack of selectedAttacks[atacksIndex]) {
            console.log('attack name', attack);
            console.log('insertId', insertId.rows[0].id);

            const moveResult = await connection.query(MoveQueryText, [attack, insertId.rows[0].id]);
            // console.log('inserted move:', moveResult);
          }
        }
      }
    }
    await connection.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back transfer`, error);
    res.sendStatus(500);
  } finally {
    // Always runs - both after successful try & after catch
    // Put the client connection back in the pool
    // This is super important! 
    connection.release()
  }
});


router.delete('/:id', rejectUnauthenticated, (req, res) => {

  const userId = req.user.id;
  const teamId = req.params.id;
  // console.log('in Delete Team')
  // console.log('TeamID', teamId);
  // console.log('userId', userId)

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

// router.put("/:id", rejectUnauthenticated, (req, res) => {
  
//   const userId = req.user.id;
//   const teamID = req.params.id;
//   const apiIDArray = req.body.payload.updateApiIDArray;

//   const previousApiIDArray = req.body.payload.previousApiIDArray;

//   const currentApiID = [];
//   const previousApiID = [];



//   console.log('userId', userId);
//   console.log('teamID', teamID);
//   console.log('apiIDArray', apiIDArray);
//   console.log('previousApiIDArray', previousApiIDArray)

//   for (let api_id of apiIDArray) {
//     currentApiID.push(api_id.api_pokemon_id);
//   }

//   for (let previousApi of previousApiIDArray) {
//     previousApiID.push(previousApi.api_pokemon_id);

//   }

//   while (currentApiID.length < 6) {
//     currentApiID.push(201);
//   }

//   while (previousApiID.length < 6) {
//     previousApiID.push(201);
//   }

//   console.log('currentApiId', currentApiID);
//   console.log('previousApiID', previousApiID);


//   const DeleteText = `DELETE FROM "team" WHERE "id" = $1 AND "user_id" = $2;`;


//   const queryText = `UPDATE "team_pokemon"
//   SET api_pokemon_id = $3 
//   WHERE "team_pokemon".team_id = $1 AND "team_pokemon".api_pokemon_id = $2;`

//   });

module.exports = router;
