import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import '../TeamList/TeamList.css';
import './AnalyzeTeam.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import AnalyzeTeamItem from "../AnalyzeTeamItem/AnalyzeTeamItem";

function AnalyzeTeam ({ team }) {

    const handleAnalyze = () => {
        console.log('in Analyze');
    }

    return (
        <>
            <h1 className='analyze-team-name'>{team[0]?.metaData?.team_name}</h1>
            <section onClick={handleAnalyze} className="analyze-team-style">

                {team?.map((pokemon) => {
                    return <AnalyzeTeamItem key={pokemon.id * team.indexOf(pokemon)} team={pokemon} />;
                })}


            </section>
        </>
    )
}

export default AnalyzeTeam;
