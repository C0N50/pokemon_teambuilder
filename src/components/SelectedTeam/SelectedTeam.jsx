import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectedTeamPokemon from "../SelectedTeamPokemon/SelectedTeamPokemon";
// import '../TeamList/TeamList.css';
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./SelectedTeam.css";

/**
 *
 * @param {object} team
 * @returns Team List to be displayed on Edit view.
 * The Selected Team is stored in a reducer and is not displayed on the front page.
 */
function SelectedTeam({ team, handlePokemonEditClick }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((store) => store.user);
  const selectedTeam = useSelector((store) => store.selectedTeam);

  // console.log('in teamlist createdTeamsByUser', team);
  // console.log('teamList', team);

  const updateTeam = () => {
    let hasMove = false;

    for (let pokemon of team) {
      if (pokemon.selectedAttacks && pokemon?.selectedAttacks[0]) {
        hasMove = true;
      } else {
        hasMove = false;
      }
    }

    for (let selected of selectedTeam) {
      if (selected.selectedAttacks && selected?.selectedAttacks.length > 0) {
        hasMove = true;
      } else {
        hasMove = false;
      }
    }

    if (hasMove) {
      // console.log('in Update Team');

      //Table : "team_pokemon"
      //Columns: "team_id", "api_id"

      //Table : "team"
      //Coumns : "user_id"
      // console.log('team', team);

      const teamId = team[0].metaData.team_id;

      // console.log('teamId', teamId);

      const teamMetaData = {
        team_id: teamId,
        team_name: team[0].metaData.team_name,
        user_id: user.id,
      };
      // console.log('Team Content to Save', team);
      // console.log('user ID', user.id);

      const saveTeamArray = team.map((savePokemon) => {
        return {
          api_pokemon_id: savePokemon.id,
        };
      });

      //////-----------------------------------------
      const attackData = team.map((pokemon) => {
        // console.log('pokemon', pokemon)
        // console.log('selected attack array', pokemon.selectedAttacks);
        if (pokemon.id && pokemon.selectedAttacks) {
          return pokemon.selectedAttacks;
        }
      });

      // console.log('attackData', attackData);

      // //////=====================================
      // console.log('team', team);
      // console.log('saveTeamArray', saveTeamArray)
      // console.log('Team Name to save', saveTeamName);

      const saveTeamObject = {
        metaData: teamMetaData,
        apiIdArray: saveTeamArray,
        selected_attacks: attackData,
      };
      // console.log('save Team Object', saveTeamObject);

      //This is Not Data Safe. This needs to be refactored.
      //The Delete Should be moved to the router in Post

      dispatch({
        type: "POST_SELECTED_TEAM",
        payload: saveTeamObject,
      });

      dispatch({
        type: "DELETE_TEAM",
        payload: teamId,
      });

      dispatch({
        type: "DELETE_SELECTED_TEAM",
      });

      history.push("/user");
    } else {
      Swal.fire("A pokemon has no moves!");
    }
  };

  /**
   * Calls Saga to send DELETE team from reducer
   */
  const deleteTeam = () => {
    dispatch({
      type: "DELETE_SELECTED_TEAM",
    });
  };

  /**
   * Calls Sweet Alert for user to input name of team, creates object with team name and array of Pokemon API ids,
   *  then sends the object to the saga to be POST to the server.
   */
  const saveTeam = () => {
    // console.log('selected', selectedTeamList);

    Swal.fire({
      title: "Save Current Team?",
      text: "Enter a Team Name:",
      input: "text",
      showCancelButton: true,
      confirmButtonColor: "#FF0000",
    }).then((result) => {
      if (result.value) {
        // console.log("Result: " + result.value);
        // setTeamName(result.value);

        let hasMove = false;

        for (let pokemon of team) {
          // console.log('in save pokemon.selectedAttacks', pokemon.selectedAttacks);
          if (pokemon.selectedAttacks && pokemon?.selectedAttacks[0]) {
            hasMove = true;
          } else {
            hasMove = false;
          }
        }

        if (hasMove) {
          const teamMetaData = {
            team_name: result.value,
            user_id: user.id,
          };
          // console.log('Team Content to Save', team);
          // console.log('user ID', user.id);

          const saveTeamArray = team.map((savePokemon) => {
            return {
              api_pokemon_id: savePokemon.id,
            };
          });

          // console.log('saveTeamArray', saveTeamArray)
          // console.log('Team Name to save', saveTeamName);
          ////////--------------------------------------------------------------
          const attackData = team.map((pokemon) => {
            // console.log('pokemon', pokemon)
            // console.log('selected attack array', pokemon.selectedAttacks);
            if (pokemon.id && pokemon.selectedAttacks) {
              return pokemon.selectedAttacks;
            }
          });

          // console.log('attackData', attackData);
          ////////========================================================

          const saveTeamObject = {
            metaData: teamMetaData,
            apiIdArray: saveTeamArray,
            selected_attacks: attackData,
          };
          // console.log('save Team Object', saveTeamObject);

          dispatch({
            type: "POST_SELECTED_TEAM",
            payload: saveTeamObject,
          });

          history.push("/user");
        } else {
          Swal.fire("A pokemon has no moves!");
        }
      }
    });
  };

  // console.log('team name', team[0].metaData.team_name);

  return (
    <>
      <h1 className="selected-team-name">{team[0]?.metaData?.team_name}</h1>
      <section className="selected-list-style">
        {team[0] && (
          <Button onClick={deleteTeam} variant="contained">
            Clear Team
          </Button>
        )}

        {team?.map((pokemon) => {
          return (
            <SelectedTeamPokemon
              key={team.indexOf(pokemon)}
              pokemon={pokemon}
              handlePokemonEditClick={handlePokemonEditClick}
            />
          );
        })}

        {team[0] &&
          (team[0].metaData ? (
            <Button onClick={updateTeam} variant="contained">
              Update Team
            </Button>
          ) : (
            <Button onClick={saveTeam} variant="contained">
              Save Team
            </Button>
          ))}
      </section>
    </>
  );
}

export default SelectedTeam;
