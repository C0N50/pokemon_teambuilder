import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';




import CreatedTeamsByUserList from '../CreatedTeamsByUserList/CreatedTeamsByUserList';
import TeamList from '../TeamList/TeamList';
import AnalyzeTeamMenu from '../AnalyzeTeamMenu/AnalyzeTeamMenu';


function AnalyticsPage() {

  const user = useSelector((store) => store.user);

  
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

  //Displays Users landing page. Including Create team button and all teams user has created.
  return (
    <div className="container">

      <div className='teams-title'>
        <div >
          <img src="Data-unown.png" width="15%" height="auto" />
        </div>


      </div>

      <div>
        <AnalyzeTeamMenu />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default AnalyticsPage;
