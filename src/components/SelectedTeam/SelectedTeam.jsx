import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectedTeamPokemon from "../SelectedTeamPokemon/SelectedTeamPokemon";
import { useState } from "react";
import '../TeamList/TeamList.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function SelectedTeam({ team }) {

    const dispatch = useDispatch();
    // const teamList = useSelector((store) => store.teamList);
    const user = useSelector((store) => store.user);

    console.log('in teamlist createdTeamsByUser', team);

    console.log('teamList', team);

    const deleteTeam = () => {
        console.log('in delete team');
        dispatch({
            type: 'DELETE_SELECTED_TEAM'
        })
    }

    const saveTeam = () => {
        console.log('clicked saveTeam');
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