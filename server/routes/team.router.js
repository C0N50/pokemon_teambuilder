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
  console.time('GET START')
  // what is the value of req.user????

  //Query Text to fetch Pokemon Team IDs and Pokemon API IDs from Database
  queryText = `SELECT "user".username, "team".id AS team_id, "team".team_name, "team_pokemon".id AS team_pokemon_id, "team_pokemon".api_pokemon_id FROM "user"
  JOIN "team" ON "team".user_id = "user".id
  JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
  WHERE  "user".id=$1
  GROUP BY "user".username, "team".id, "team".team_name, "team_pokemon".id, "team_pokemon".api_pokemon_id`;

  const userParam = req.user.id;

  //Pool call to fetch Pokemon Team IDs and Pokemon API IDs from Database
  pool
    .query(queryText, [userParam])
    .then((result) => {

      const endpointsArray = result.rows.map((pokemonid) => {
        return `https://pokeapi.co/api/v2/pokemon/${pokemonid.api_pokemon_id}`
      })

      let urlArray = [];
      let promiseArray = [];

      for (let endpoint of endpointsArray) {
        urlArray.push(endpoint);
      }

      for (let url of urlArray) {
        const promise = axios.get(url);
        promiseArray.push(promise);
      }

      Promise.all(promiseArray).then(function (values) {

        let valuesArray = [];

        for (let value of values) {
          // console.log(value.data);

          let pokemonObject = {
            id : value.data.id,
            name: value.data.name,
            moves : value.data.moves,
            stats : value.data.stats,
            types : value.data.types,
            species : value.data.species
          }

          valuesArray.push(pokemonObject);
        }

        // console.log('values Array', valuesArray);

        for (let i = 0; i < valuesArray.length; i++) {
          valuesArray[i]["metaData"] = result.rows[i];
        }
        // console.log('values Array', valuesArray[0].metaData);

        const moveQueryText = `SELECT pokemon_move.name AS movename, pokemon_move.team_pokemon_id FROM "user"
        JOIN "team" ON "team".user_id = "user".id
        JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
        JOIN "pokemon_move" ON "team_pokemon".id = "pokemon_move".team_pokemon_id
        WHERE  "user".id=$1
        GROUP BY  pokemon_move.name, pokemon_move.team_pokemon_id`

        pool
          .query(moveQueryText, [userParam])
          .then((result2) => {

            let movesArray = result2.rows;
            let movePromiseArray = [];


            for (let value of valuesArray) {
              // console.log('valuesArray - team-pokemon id', value.metaData.team_pokemon_id);

              for (let move of movesArray) {
                if (move.team_pokemon_id === value.metaData.team_pokemon_id) {

                  // console.log('move', move);

                  let moveAPIURL = 'https://pokeapi.co/api/v2/move/' + move.movename;

                  // console.log('moveAPI URL', moveAPIURL);

                  //BREAKS EVERYTHING IF MOVE DATA ISN"T RIGHT
                  const promise = axios.get(moveAPIURL, rejectUnauthenticated);
                  movePromiseArray.push(promise);

                }
              }
            }
            Promise.all(movePromiseArray).then(function (apiMoves) {
              // console.log(values[0].data);

              for (let value of valuesArray) {
                let attacksArray = [];
                for (let move of movesArray) {
                  if (move.team_pokemon_id === value.metaData.team_pokemon_id) {
                    // console.log('move.team_pokemon_id', move.team_pokemon_id);
                    // console.log('value.metaData.team_pokemon_id', value.metaData.team_pokemon_id)
                    // console.log('move.movename', move.movename)

                    for (let apiMove of apiMoves) {
                      if (apiMove.data.name === move.movename && move.team_pokemon_id === value.metaData.team_pokemon_id) {

                        // console.log('pokemon (value) name', value.name)
                        // console.log('apiMoves names', apiMove.data.name)

                        // console.log('type', apiMove.data.type.name)

                        let moveObject = {
                          name: apiMove.data.name,
                          type: apiMove.data.type.name
                        }

                        attacksArray.push(moveObject);
                      }
                    }
                  }

                }

                // console.log('move array', movesArray);

                const key = 'name';
                const uniqueAttackArray = [...new Map(attacksArray.map(item => [item[key], item])).values()]

                // attacksArray.push(move.movename);
                // console.log('uniqueattacksArry', uniqueAttackArray);

                value.selectedAttacks = uniqueAttackArray;
              }

              const teamTypes = valuesArray.map((pokemon) => {

                return pokemon.types;
              })

              // console.log('team types', teamTypes);

              let promiseArray = [];

              for (let pokemonTypes of teamTypes) {
                for (let type of pokemonTypes) {
                  let typeApiURL = 'https://pokeapi.co/api/v2/type/' + type.type.name;
                  // console.log('typeApiURL', typeApiURL);
                  const promise = axios.get(typeApiURL);
                  promiseArray.push(promise);

                }
              }
              Promise.all(promiseArray).then(function (values) {

                // console.log('values', values);

                for (let pokemon of valuesArray) {
                  pokemon['typeData'] = [];
                  values.map((valueType) => {
                    for (let type of pokemon.types) {
                      if (valueType.data.name === type.type.name) {
                        let typeName = valueType.data.name

                        let typeObject = {
                          name: valueType.data.name,
                          damage_relations: valueType.data.damage_relations
                        }

                        return pokemon.typeData.push(typeObject)
                      }
                    }
                  })
                  const key = 'name';
                  const uniqueTypeArray = [...new Map(pokemon.typeData.map(item => [item[key], item])).values()]
                  pokemon.typeData = uniqueTypeArray;
                }

                // console.log('valuesArray type names', valuesArray)




                let myJsonString = JSON.stringify(valuesArray);

                res.send(myJsonString);
                console.timeEnd('GET START')


              })

            })
          })
          .catch((error) => {
            // console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
          })
      })
        .catch((error) => {
          // console.log('Error making SELECT for secrets:', error);
          res.sendStatus(500);
        });
      // GET route code here
    })


  /* Refactored team.router POST route to Databse. 
  Instead of a single SQL query the POST now generates uses Await & promises like Edans example from week 15. 
  This is to provide returned team_pokemon IDs for the move Database to use for their sql inserts. 
  These Ids are also to be used for any other attribute tables that are to reference the team_pokemon table*/

  /**
   * POST route template
   */
  router.post('/', rejectUnauthenticated, async (req, res) => {

    // console.log(req.body);

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

      // console.log('apiIDQueryParams', apiIDQueryParams);
      // console.log('New Team ID', newTeamId);

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
        // console.log('Pokemon Result ID', resultID.rows[0].id);
      }

      const MoveQueryText = `INSERT INTO "pokemon_move" ("name", "team_pokemon_id")
    VALUES ($1, $2);`

      const selectedAttacks = req.body.selected_attacks;
      // console.log('selectedAttacks', selectedAttacks);

      for (let insertId in pokemonResultIDs) {
        if (selectedAttacks[insertId]) {
          for (attack of selectedAttacks[insertId]) {
            // console.log('attack name', attack);
            // console.log('insertId', pokemonResultIDs[insertId].rows[0].id);

            const moveResult = await connection.query(MoveQueryText, [attack.name, pokemonResultIDs[insertId].rows[0].id]);
            // console.log('inserted move:', moveResult);
          }
        }
      }
      await connection.query('COMMIT');
      res.sendStatus(201);
    } catch (error) {
      await connection.query('ROLLBACK');
      // console.log(`Transaction Error - Rolling back transfer`, error);
      res.sendStatus(500);
    } finally {
      // Always runs - both after successful try & after catch
      // Put the client connection back in the pool
      // This is super important! 
      connection.release()
    }
  })
})


router.delete('/:id', rejectUnauthenticated, (req, res) => {




  const userId = req.user.id;
  const teamId = req.params.id;
  // console.log('in Delete Team')
  // console.log('req.params', req.params);
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

router.put("/:id", rejectUnauthenticated, (req, res) => {

  const userId = req.user.id;
  const teamId = req.params.id;
  const teamName = req.body.payload

  const queryText = `UPDATE team SET team_name = $1 WHERE id = $2 AND user_id = $3;
  `;

  const queryParams = [teamName, teamId, userId];

  console.log(queryParams);

  pool
    .query(queryText, queryParams)
    .then(() => {
      console.log('changed team name')
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log("Error updating team name", err);
      res.sendStatus(500);
    });
})

module.exports = router;
