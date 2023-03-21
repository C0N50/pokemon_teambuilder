import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamItem from "../TeamItem/TeamItem";
import { useState } from "react";
import './TeamList.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


/**
 * 
 * @param {object} team 
 * @returns team list to be displayed on user landing page
 */
function TeamList({ team }) {

    const dispatch = useDispatch();
    // const teamList = useSelector((store) => store.teamList);
    const user = useSelector((store) => store.user);

    // console.log('teamList', team);


    // console.log('team name', team[0].metaData.team_name);


    const handleTeamDelete = () => {
        console.log('clicked delete team');
        // console.log('team meta', team[0].metaData);

       const teamId = team[0].metaData.team_id;
    //    console.log('teamId metadata id', team[0].metaData.team_id);   

        dispatch({
            type : 'DELETE_TEAM',
            payload : teamId
        })
    }

    const handleTeamEdit = () => {
        console.log('clicked Team Edit');
        // console.log('team', team)
        dispatch({
            type : 'SET_CURRENT_TEAM',
            payload : team
        })
    }


    return (
        <>
            <h1 className='team-name'>{team[0]?.metaData?.team_name}</h1>
            <section className="team-list-style">

                <Button onClick={handleTeamDelete} variant='contained'>
                    Delete
                </Button>

                {team?.map((pokemon) => {
                    return <TeamItem key={pokemon.id * team.indexOf(pokemon)} team={pokemon} />;
                })}

                <Button onClick={handleTeamEdit} variant='contained' component={Link} to="/teamEdit">
                    Edit
                </Button>

            </section>
        </>
    )
}

export default TeamList;