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

  //Step 1: Fetch Pokemon Team IDs and Pokemon API IDs and MoveNames from Database
  queryText = `SELECT "user".username, "team".id AS team_id, "team".team_name, "team_pokemon".id AS team_pokemon_id, "team_pokemon".api_pokemon_id, ARRAY_AGG(pokemon_move.name) AS moveset FROM "user"
  JOIN "team" ON "team".user_id = "user".id
  JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
  JOIN "pokemon_move" ON "team_pokemon".id = "pokemon_move".team_pokemon_id
  WHERE  "user".id=$1
  GROUP BY "user".username, "team".id, "team".team_name, "team_pokemon".id, "team_pokemon".api_pokemon_id ;`;

  const userParam = req.user.id;

  //Pool call to fetch Pokemon Team IDs and Pokemon API IDs from Database
  pool
    .query(queryText, [userParam])
    .then((result) => {


      // console.log('result moveset', result.rows[0].moveset);

      const moveSetArray = result.rows.map((pokemon) => {
        let team_pokemon_id = pokemon.team_pokemon_id;
        let moveSet = pokemon.moveset.flat();

        return {
          team_pokemon_id: team_pokemon_id,
          moveSet: moveSet
        }
      })

      // console.log('MoveSet Array', moveSetArray)


      //Creates the URL to send a GET request to the PokeAPI Endpoint to retrieve a Pokemon Data object. 
      //The Pokemon data object provides comprehensive 
      const pokemonEndpointsArray = result.rows.map((pokemonid) => {
        return `https://pokeapi.co/api/v2/pokemon/${pokemonid.api_pokemon_id}`
      })

      let promiseArray = [];

      for (let endpoint of pokemonEndpointsArray) {
        const promise = axios.get(endpoint);

        promiseArray.push(promise);
      }

      // console.time('Pokemon API START')
      Promise.all(promiseArray).then(function (values) {
        // console.timeEnd('Pokemon API START')

        let pokemonArray = [];
        let i = 0;

        for (let value of values) {
          // console.log('value.data', value.data);

          let pokemonObject = {
            id: value.data.id,
            name: value.data.name,
            moves: value.data.moves,
            stats: value.data.stats,
            types: value.data.types,
            species: value.data.species,
            metaData: result.rows[i]
          }


          pokemonArray.push(pokemonObject);
          i++;
        }

        let movePromiseArray = [];

        for (let moveSet of moveSetArray)
          for (let move of moveSet.moveSet) {

            let moveAPIURL = 'https://pokeapi.co/api/v2/move/' + move;

            //API call to move endpoint of PokeAPI to fetch move data. 
            //Provides all necessary move data: type, physical or special classification, power, accuracy, pp, and effect.
            const promise = axios.get(moveAPIURL, rejectUnauthenticated);
            movePromiseArray.push(promise);

          }

        // console.time('Move API START')
        Promise.all(movePromiseArray).then(function (apiMoves) {
          // console.timeEnd('Move API START')
          // console.log(values[0].data);
          // console.log('apiMoves', apiMoves);

          for (let pokemon of pokemonArray) {
            let attacksArray = [];
            for (let moveSet of moveSetArray) {
              if (moveSet.team_pokemon_id === pokemon.metaData.team_pokemon_id) {
                // console.log('move.team_pokemon_id', move.team_pokemon_id);
                // console.log('value.metaData.team_pokemon_id', value.metaData.team_pokemon_id)
                // console.log('move.movename', move.movename)
                let flattenedMoveSet = moveSet.moveSet.flat();

                // console.log('flattened moveSet', flattenedMoveSet);
                index = 0;

                for (let flattenedMove of flattenedMoveSet) {
                  for (let apiMove of apiMoves) {

                    // console.log('apiMove.data.name', apiMove.data.name);
                    // console.log('flattened move', flattenedMoveSet[index])

                    // console.log('movSet.team_pokemon_id', moveSet.team_pokemon_id)
                    // console.log('pokemon.metaData.team_pokemon_id', pokemon.metaData.team_pokemon_id)



                    if (apiMove.data.name === flattenedMove && moveSet.team_pokemon_id === pokemon.metaData.team_pokemon_id) {

                      // console.log('pokemon (value) name', value.name)
                      // console.log('apiMoves names', apiMove.data.name)

                      // console.log('type', apiMove.data.type.name)

                      let moveObject = {
                        name: apiMove.data.name,
                        type: apiMove.data.type.name
                      }

                      // console.log('moveObject', moveObject);

                      attacksArray.push(moveObject);
                    }
                  }
                }
              }

            }


            const key = 'name';
            const uniqueAttackArray = [...new Map(attacksArray.map(item => [item[key], item])).values()]

            // attacksArray.push(move.movename);
            // console.log('uniqueattacksArry', uniqueAttackArray);

            pokemon.selectedAttacks = uniqueAttackArray;
          }



          const teamTypes = pokemonArray.map((pokemon) => {

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
          // console.time('TYPE START')
          Promise.all(promiseArray).then(function (values) {
            // console.timeEnd('TYPE START')

            // console.log('values', values);

            for (let pokemon of pokemonArray) {
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

            // console.log('pokemonArray type names', pokemonArray)

            let myJsonString = JSON.stringify(pokemonArray);

            res.send(myJsonString);
            console.timeEnd('GET START')


          })

        })
        // })
        // .catch((error) => {
        //   // console.log('Error making SELECT for secrets:', error);
        //   res.sendStatus(500);
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
These Ids are also to be used for any other attribute tables that are to reference the team_pokemon table
*/

router.post('/', rejectUnauthenticated, async (req, res) => {


  console.log('in post metaData', req.body.metaData);

  console.log('metaData team id', req.body.metaData.team_id)

  console.log('req.user.id', req.user.id);


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
    const result = await connection.query(TeamInsertQueryText, [req.body.metaData.team_name, req.body.metaData.user_id]);
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

    if (req.body.metaData.team_id) {

      const deleteQueryText = `DELETE FROM "team" WHERE "id" = $1 AND "user_id" = $2;`;

      const userId = req.user.id;
      const teamId = req.body.metaData.team_id;

      await connection.query(deleteQueryText, [teamId, userId]);
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
