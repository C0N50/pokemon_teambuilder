import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamItem from "../TeamItem/TeamItem";
import { useState } from "react";
import './TeamList.css';

function TeamList(createdTeamsByUser) {

    const dispatch = useDispatch();
    const teamList = useSelector((store) => store.teamList);
    const user = useSelector((store) => store.user);

    console.log('in teamlist createdTeamsByUser', createdTeamsByUser);

    useEffect(() => {
        console.log("in use effect");
        console.log('in fetch Team API data')
        dispatch({
            type: 'FETCH_TEAM_LIST',
        });
    }, []);

    console.log('teamList', teamList);

    

    return (
        <section className="team-list-style">
            {teamList?.map((team) => {
                return <TeamItem key={teamList.indexOf(team)} team={team} />;
            })}
        </section>
    )
}

export default TeamList;