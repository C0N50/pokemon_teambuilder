import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TeamList from "../TeamList/TeamList";
import './CreatedTeamsByUserList.css';



function CreatedTeamsByUserList() {

    
    const dispatch = useDispatch();
    const createdTeamsByUser = useSelector((store) => store.teamList);


    useEffect(() => {
        console.log("in use effect");
        console.log('in fetch Team API data')

        dispatch({
            type: 'FETCH_TEAM_LIST',
        });

        dispatch({
            type: 'FETCH_TYPE_LIST',
        });


        for (let team of createdTeamsByUser) {
            console.log('created team by user in dispatch', team)

            // dispatch({
            //     type: 'FETCH_MOVE_DATA',
            // });
        }

    }, []);

    // console.log('createdTeamsByUser', createdTeamsByUser);

    const sortedTeams = createdTeamsByUser.sort((a, b) => b?.metaData.team_id - a?.metaData.team_id);

    // console.log('sorted Teams', sortedTeams)

    let teamIDArray = [];
    let LastId = '';
    let TempArray = [];

    for (let teamIndex in sortedTeams) {
        // console.log('team id', createdTeamsByUser[teamIndex]?.metaData.id);
        // console.log('length', createdTeamsByUser.length)
        // console.log('teamIndex', teamIndex)

        if (LastId === '') {
            TempArray.push(sortedTeams[teamIndex]);
            LastId = sortedTeams[teamIndex]?.metaData.team_id;
            // console.log('Last id', LastId);
            // console.log('TempArray', TempArray);
            // console.log('teamIndex', teamIndex)

            if (Number(teamIndex) === (sortedTeams.length - 1)) {
                teamIDArray.push(TempArray);
            }
        }
        else if (sortedTeams[teamIndex]?.metaData.team_id === LastId) {
            TempArray.push(sortedTeams[teamIndex]);
            LastId = sortedTeams[teamIndex]?.metaData.team_id;
            // console.log('Last id', LastId);
            // console.log('TempArray', TempArray);
            // console.log('teamIndex', teamIndex)

            if (Number(teamIndex) === (sortedTeams.length - 1)) {
                teamIDArray.push(TempArray);
            }
        }
        else {
            teamIDArray.push(TempArray);
            TempArray = [];
            TempArray.push(sortedTeams[teamIndex]);
            LastId = sortedTeams[teamIndex]?.metaData.team_id;
            // console.log('Last id', LastId);
            // console.log('TempArray', TempArray);
            // console.log('teamID Array', teamIDArray);
            // console.log('teamIndex', teamIndex)
            if (Number(teamIndex) === (sortedTeams.length - 1)) {
                teamIDArray.push(TempArray);
            }
        }
    }

    if (teamIDArray[0]?.length === 0) {
        teamIDArray.shift();
    }

    // teamIDArray.push(teamObject?.metaData.id)
    console.log('teamID Array', teamIDArray);

    dispatch ({
        type : 'SET_SORTED_TEAMS',
        payload : teamIDArray
    })


    return (
        <>
            <section className='created-by-user-list-style' >
                {teamIDArray?.map((team) => {
                    // console.log('team', team);
                    return < TeamList key={teamIDArray.indexOf(team)} team={team} />

                })}
            </section>
        </>
    )

}

export default CreatedTeamsByUserList;