import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectedTeamPokemon from "../SelectedTeamPokemon/SelectedTeamPokemon";
import { useState } from "react";
// import '../TeamList/TeamList.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import './SelectedTeam.css'


/**
 * 
 * @param {object} team 
 * @returns Team List to be displayed on Edit view.
 * The Selected Team is stored in a reducer and is not displayed on the front page.
 */
function SelectedTeam({ team }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [currentDatabaseTeamList, setCurrentDatabaseTeamList] = useState(team);
    const user = useSelector((store) => store.user);

    const [saveTeamName, setTeamName] = useState('');
    const [saveTeamMetaObject, setSaveTeamMetaObject] = useState({
        team_name: '',
        user_id: '',
    });

    const [saveTeamPokemonArray, setSaveTeamPokemonArray] = useState([]);

    // console.log('in teamlist createdTeamsByUser', team);
    // console.log('teamList', team);


    const updateTeam = () => {

        console.log('in Update Team');

        //Table : "team_pokemon"
        //Columns: "team_id", "api_id"

        //Table : "team"
        //Coumns : "user_id"

        const teamId = team[0].metaData.id;
        console.log('teamId', teamId);   
 
         const teamMetaData = {
            team_name: team[0].metaData.team_name,
            user_id: user.id
        }
        // console.log('Team Content to Save', team);
        // console.log('user ID', user.id);

        const saveTeamArray = team.map((savePokemon) => {
            return {
                api_pokemon_id: savePokemon.id
            }
        })

        console.log('saveTeamArray', saveTeamArray)
        console.log('Team Name to save', saveTeamName);

        const saveTeamObject = {
            MetaData: teamMetaData,
            apiIdArray: saveTeamArray
        }
        console.log('save Team Object', saveTeamObject);

        dispatch({
            type : 'DELETE_TEAM',
            payload : teamId
        })

        dispatch({
            type: 'POST_SELECTED_TEAM',
            payload: saveTeamObject
        })

        dispatch({
            type: 'DELETE_SELECTED_TEAM'
        })


        history.push('/user');



        // const updateApiIDArray = team.map((savePokemon) => {
        //     return {
        //         api_pokemon_id: savePokemon.id
        //     }
        // })

        // const previousApiIDArray = currentDatabaseTeamList.map((savePokemon) => {
        //     return {
        //         api_pokemon_id: savePokemon.id
        //     }
        // })

        // const UpdateTeamID = team[0].metaData.id
        // console.log('update Team ID', UpdateTeamID)

        // console.log('original database Team IDs', previousApiIDArray);

        // console.log('updateApiIDArray', updateApiIDArray)

        // const updateTeamObject = {
        //     UpdateTeamID : UpdateTeamID,
        //     updateApiIDArray: updateApiIDArray,
        //     previousApiIDArray : previousApiIDArray
        // }
        // console.log('save Team Object', updateTeamObject);

        // dispatch({
        //     type: 'UPDATE_TEAM',
        //     payload: updateTeamObject
        // })

        // dispatch({
        //     type: 'DELETE_SELECTED_TEAM'
        // })

        // dispatch({
        //     type: 'DELETE_SELECTED_TEAM'
        // })


        // Swal.fire({
        //     title: "Save Current Team?",
        //     text: "Enter a Team Name:",
        //     confirmButtonColor: '#FF0000'


        //         history.push('/user');




        }

    /**
     * Calls Saga to send DELETE team from reducer
     */
    const deleteTeam = () => {
            console.log('in delete team');
            dispatch({
                type: 'DELETE_SELECTED_TEAM'
            })
        }


        /**
         * Calls Sweet Alert for user to input name of team, creates object with team name and array of Pokemon API ids,
         *  then sends the object to the saga to be POST to the server.
         */
        const saveTeam = () => {
            console.log('clicked saveTeam');
            // console.log('selected', selectedTeamList);

            Swal.fire({
                title: "Save Current Team?",
                text: "Enter a Team Name:",
                input: 'text',
                showCancelButton: true,
                confirmButtonColor: '#FF0000'
            }).then((result) => {
                if (result.value) {
                    // console.log("Result: " + result.value);
                    // setTeamName(result.value);

                    const teamMetaData = {
                        team_name: result.value,
                        user_id: user.id
                    }
                    // console.log('Team Content to Save', team);
                    // console.log('user ID', user.id);


                    const saveTeamArray = team.map((savePokemon) => {
                        return {
                            api_pokemon_id: savePokemon.id
                        }
                    })

                    console.log('saveTeamArray', saveTeamArray)
                    console.log('Team Name to save', saveTeamName);

                    const saveTeamObject = {
                        MetaData: teamMetaData,
                        apiIdArray: saveTeamArray
                    }
                    console.log('save Team Object', saveTeamObject);

                    dispatch({
                        type: 'POST_SELECTED_TEAM',
                        payload: saveTeamObject
                    })

                    dispatch({
                        type: 'DELETE_SELECTED_TEAM'
                    })


                    history.push('/user');

                }
            });
        }

        // console.log('team name', team[0].metaData.team_name);

        return (
            <>
                <h1 className='selected-team-name'>{team[0]?.metaData?.team_name}</h1>
                <section className="selected-list-style">

                    {team[0] && (
                        <Button onClick={deleteTeam} variant='contained'>
                            Clear Team
                        </Button>
                    )}

                    {team?.map((pokemon) => {
                        return <SelectedTeamPokemon key={team.indexOf(pokemon)} team={pokemon} />;
                    })}

                    {team[0] && (team[0].metaData ?
                        <Button onClick={updateTeam} variant='contained'>
                            Update Team
                        </Button>
                        :
                        <Button onClick={saveTeam} variant='contained'>
                            Save Team
                        </Button>
                    )}

                </section>
            </>
        )
    }

    export default SelectedTeam;