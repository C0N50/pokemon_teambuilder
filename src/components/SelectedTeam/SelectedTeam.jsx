import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectedTeamPokemon from "../SelectedTeamPokemon/SelectedTeamPokemon";
import { useState } from "react";
import '../TeamList/TeamList.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";


/**
 * 
 * @param {object} team 
 * @returns Team List to be displayed on Edit view.
 * The Selected Team is stored in a reducer and is not displayed on the front page.
 */
function SelectedTeam({ team }) {

    const dispatch = useDispatch();
    const selectedTeamList = useSelector((store) => store.selectedTeam);
    const user = useSelector((store) => store.user);

    const [saveTeamName, setTeamName] = useState('');
    const [saveTeamMetaObject, setSaveTeamMetaObject] = useState({
        team_name : '',
        user_id : '',
    });

    const [saveTeamPokemonArray, setSaveTeamPokemonArray] = useState([]);



    // console.log('in teamlist createdTeamsByUser', team);

    // console.log('teamList', team);

    const deleteTeam = () => {
        console.log('in delete team');
        dispatch({
            type: 'DELETE_SELECTED_TEAM'
        })
    }

    const saveTeam = () => {
        console.log('clicked saveTeam');
        // console.log('selected', selectedTeamList);

        Swal.fire({
            title: "Save Current Team?",
            text: "Enter a Team Name:",
            input: 'text',
            showCancelButton: true,
            confirmButtonColor:'#FF0000'        
        }).then((result) => {
            if (result.value) {
                // console.log("Result: " + result.value);
                // setTeamName(result.value);

                const teamMetaData = {
                    team_name : result.value,
                    user_id : user.id
                }
                // console.log('Team Content to Save', team);
                // console.log('user ID', user.id);

                
                const saveTeamArray = team.map((savePokemon) => {
                    return {
                        api_pokemon_id : savePokemon.id
                    }
                })

                console.log('saveTeamArray', saveTeamArray)
                console.log('Team Name to save', saveTeamName);

                const saveTeamObject = {
                    MetaData : teamMetaData,
                    apiIdArray : saveTeamArray
                }
                console.log('save Team Object', saveTeamObject);

                dispatch ({
                    type : 'POST_SELECTED_TEAM',
                    payload : saveTeamObject
                })

                history.push('/user');

            }
        });
    }

    // console.log('team name', team[0].metaData.team_name);

    return (
        <>
            <h2>{team[0]?.metaData?.team_name}</h2>
            <section className="team-list-style">

                {team[0] && (
                    <Button onClick={deleteTeam} variant='contained'>
                        Delete Team
                    </Button>
                )}

                {team?.map((pokemon) => {
                    return <SelectedTeamPokemon key={team.indexOf(pokemon)} team={pokemon} />;
                })}

                {team[0] && (
                    <Button onClick={saveTeam} variant='contained'>
                        Save Team
                    </Button>
                )}

            </section>
        </>
    )
}

export default SelectedTeam;