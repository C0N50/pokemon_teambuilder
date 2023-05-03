import React from "react";
import { useDispatch } from "react-redux";
import '../TeamList/TeamList.css';
import './AnalyzeTeam.css'


import AnalyzeTeamItem from "../AnalyzeTeamItem/AnalyzeTeamItem";


function AnalyzeTeam ({ team, setIsAnalyzing, isAnalyzing }) {

    const dispatch = useDispatch();


    const handleAnalyze = () => {
        // console.log('in Analyze');
        // console.log('setIsAnalyzing', setIsAnalyzing)
        // console.log('clicked team info', team);

        if(isAnalyzing) {
            dispatch({
                type : 'CLEAR_ANALYSIS_TEAM'
            })
            setIsAnalyzing(false);
        }
        else {
            dispatch({
                type : 'SET_ANALYSIS_TEAM',
                payload : team
            })
            setIsAnalyzing(true);
        }


        // console.log('Analyzing?', isAnalyzing);
        

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
