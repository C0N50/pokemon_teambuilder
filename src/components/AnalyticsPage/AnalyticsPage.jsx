import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';





import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";



import AnalyzeTeam from '../AnalyzeTeam/AnalyzeTeam';
import AnalyzeTeamItem from '../AnalyzeTeamItem/AnalyzeTeamItem';

import CreatedTeamsByUserList from '../CreatedTeamsByUserList/CreatedTeamsByUserList';
import TeamList from '../TeamList/TeamList';
import AnalyzeTeamMenu from '../AnalyzeTeamMenu/AnalyzeTeamMenu';
import DefensiveTypeChart from '../DefensiveTypeChart/DefensiveTypeChart';

import './AnalyticsPage.css'


function AnalyticsPage() {

    const user = useSelector((store) => store.user);
    const analysisTeam = useSelector((store) => store.analysisTeam)
    const dbTypeList = useSelector((store) => store.typeList);

    ///Reused Code from CreatedTeamsByUserList to fetch the team of pokemon.
    /////-----------------------------------------------------------------------------------------------------------------------------------------------------
    const dispatch = useDispatch();
    const createdTeamsByUser = useSelector((store) => store.teamList);


  

    useEffect(() => {
        // console.log("in use effect");
        // console.log('in fetch Team API data')

        dispatch({
            type: 'FETCH_TEAM_LIST',
        });

        dispatch({
            type: 'FETCH_TYPE_LIST',
        });

    }, []);

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
    // console.log('teamID Array', teamIDArray);

    dispatch({
        type: 'SET_SORTED_TEAMS',
        payload: teamIDArray
    })
    ////--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


    const [isAnalyzing, setIsAnalyzing] = useState(false);



    const capitalize = (lowercase) => {
        let capital = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        return capital;
    }


    //Displays Users Analytics page. Teams are now buttons that the user can click to enter analytics on that specific Team.
    return (
        <div className="container">

            <div className='analysis-teams-title'>
                <div >
                    <img src="Data-unown.png" width="15%" height="auto" />
                </div>


            </div>

            {isAnalyzing ?
                <>
                    <div onClick={() => { setIsAnalyzing(false) }} className='analyze-team-isAnalyzed-style'>
                        {analysisTeam?.map((pokemon) => {
                            return (
                                <Card sx={{
                                    width: 400,
                                    boxShadow: 3
                                }}>
                                    <CardContent>

                                        <Typography variant="body1" component="div">
                                            {capitalize(pokemon.name)}
                                        </Typography>

                                        <div className='type-flex-style'>
                                            {pokemon.types?.map((type) => {

                                                let type_Image_url = '';
                                                for (let dbType of dbTypeList) {
                                                    if (dbType.name === type.type.name) {
                                                        // console.log(dbType.image_url);
                                                        type_Image_url = dbType.image_url;
                                                    }
                                                }

                                                return (
                                                    <CardMedia className='pokemon-image-style' sx={{
                                                        height: 20,
                                                        width: '45%',
                                                        backgroundSize: 'contain',
                                                    }} image={type_Image_url}
                                                    />
                                                )
                                            })}
                                        </div>
                                        <CardMedia className='pokemon-image-style' sx={{
                                            height: 70,
                                            width: '100%',
                                            backgroundSize: 'contain',
                                        }} image={`https://img.pokemondb.net/artwork/large/${pokemon?.species?.name}.jpg`} />

                                        {/* <Typography className='hp' variant="body1">
                                            <div className='analysis-stat-body'>
                                                <div>HP:</div>
                                                <div>{pokemon.stats[0].base_stat}</div>
                                            </div>
                                        </Typography>

                                        <Typography className='attack' variant="body">
                                            <div className='analysis-stat-body'>
                                                Attack
                                                <div>{pokemon.stats[1].base_stat}</div>
                                            </div>
                                        </Typography>

                                        <Typography className='defense' variant="body1">
                                            <div className='analysis-stat-body'>
                                                Defense
                                                <div>{pokemon.stats[2].base_stat}</div>
                                            </div>
                                        </Typography>

                                        <Typography className='special-attack' variant="body1">
                                            <div className='analysis-stat-body'>
                                                Special Attack
                                                <div>{pokemon.stats[3].base_stat}</div>
                                            </div>
                                        </Typography>

                                        <Typography className='special-defense' variant="body1">
                                            <div className='analysis-stat-body'>
                                                Special Defense
                                                <div>{pokemon.stats[4].base_stat}</div>
                                            </div>
                                        </Typography>

                                        <Typography className='speed' variant="body1">
                                            <div className='analysis-stat-body'>
                                                Speed
                                                <div>{pokemon.stats[5].base_stat}</div>
                                            </div>
                                        </Typography> */}


                                        {/* <div className='move-flex-style'>
                                            <Typography className='Move-1' variant="caption">
                                                <div className='move-body'>
                                                    {pokemon?.selectedAttacks && pokemon.selectedAttacks[0] ?
                                                        <>
                                                            <div className='move-container'>
                                                                <div><img width='100%' height='30' src={`./Background-Type/${pokemon.selectedAttacks[0].type}_Background.png`} /></div>
                                                                <div className='move-text'>{capitalize(pokemon.selectedAttacks[0].name)}</div>
                                                            </div>
                                                        </>
                                                        : <div></div>}
                                                </div>
                                            </Typography>
                                            <Typography className='Move-2' variant="caption">
                                                <div className='move-body'>
                                                    {pokemon?.selectedAttacks && pokemon.selectedAttacks[1] ?
                                                        <>
                                                            <div className='move-container'>
                                                                <div><img width='100%' height='30' src={`./Background-Type/${pokemon.selectedAttacks[1].type}_Background.png`} /></div>
                                                                <div className='move-text'>{capitalize(pokemon.selectedAttacks[1].name)}</div>
                                                            </div>
                                                        </>
                                                        : <div></div>}
                                                </div>
                                            </Typography>
                                            <Typography className='Move-3' variant="caption">
                                                <div className='move-body'>
                                                    {pokemon?.selectedAttacks && pokemon.selectedAttacks[2] ?
                                                        <>
                                                            <div className='move-container'>
                                                                <div><img width='100%' height='30' src={`./Background-Type/${pokemon.selectedAttacks[2].type}_Background.png`} /></div>
                                                                <div className='move-text'>{capitalize(pokemon.selectedAttacks[2].name)}</div>
                                                            </div>
                                                        </>
                                                        : <div></div>}
                                                </div>
                                            </Typography>
                                            <Typography className='Move-4' variant="caption">
                                                <div className='move-body'>
                                                    {pokemon?.selectedAttacks && pokemon.selectedAttacks[3] ?
                                                        <>
                                                            <div className='move-container'>
                                                                <div><img width='100%' height='30' src={`./Background-Type/${pokemon.selectedAttacks[3].type}_Background.png`} /></div>
                                                                <div className='move-text'>{capitalize(pokemon.selectedAttacks[3].name)}</div>
                                                            </div>
                                                        </>
                                                        : <div></div>}
                                                </div>
                                            </Typography>
                                        </div> */}
                                    </CardContent>
                                    <CardActions>
                                    </CardActions>
                                </Card>


                            )
                        })}
                    </div>

                    <DefensiveTypeChart analysisTeam={analysisTeam}/>
                
                </>


                :
                <div>
                    <AnalyzeTeamMenu isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} />
                </div>
            }
        </div>
    );
}

// this allows us to use <App /> in index.js
export default AnalyticsPage;
