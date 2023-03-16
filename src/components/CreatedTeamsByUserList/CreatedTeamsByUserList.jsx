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
    }, []);

    // console.log('createdTeamsByUser', createdTeamsByUser);

    let teamIDArray = [];
    let LastId = '';
    let TempArray = [];

    for (let teamIndex in createdTeamsByUser) {
        // console.log('team id', createdTeamsByUser[teamIndex]?.metaData.id);
        // console.log('length', createdTeamsByUser.length)
        // console.log('teamIndex', teamIndex)

        if (LastId === '') {
            TempArray.push(createdTeamsByUser[teamIndex]);
            LastId = createdTeamsByUser[teamIndex]?.metaData.id;
            // console.log('Last id', LastId);
            // console.log('TempArray', TempArray);
            // console.log('teamIndex', teamIndex)
        }
        else if (createdTeamsByUser[teamIndex]?.metaData.id === LastId) {
            TempArray.push(createdTeamsByUser[teamIndex]);
            LastId = createdTeamsByUser[teamIndex]?.metaData.id;
            // console.log('Last id', LastId);
            // console.log('TempArray', TempArray);
            // console.log('teamIndex', teamIndex)

            if (Number(teamIndex) === (createdTeamsByUser.length - 1)) {
                teamIDArray.push(TempArray);
            }

        }
        else {
            teamIDArray.push(TempArray);
            TempArray = [];
            TempArray.push(createdTeamsByUser[teamIndex]);
            LastId = createdTeamsByUser[teamIndex]?.metaData.id;
            // console.log('Last id', LastId);
            // console.log('TempArray', TempArray);
            // console.log('teamID Array', teamIDArray);
            // console.log('teamIndex', teamIndex)
        }
    }


    // teamIDArray.push(teamObject?.metaData.id)
    // console.log('teamID Array', teamIDArray);





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