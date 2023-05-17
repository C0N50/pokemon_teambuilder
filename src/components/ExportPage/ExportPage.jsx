import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/base/TextareaAutosize";

import AnalyzeTeamMenu from "../AnalyzeTeamMenu/AnalyzeTeamMenu";
import DefensiveTypeChart from "../DefensiveTypeChart/DefensiveTypeChart";

import "./ExportPage.css";

function ExportPage() {
  const user = useSelector((store) => store.user);
  const analysisTeam = useSelector((store) => store.analysisTeam);
  const dbTypeList = useSelector((store) => store.typeList);

  ///Reused Code from CreatedTeamsByUserList to fetch the team of pokemon.
  /////-----------------------------------------------------------------------------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const createdTeamsByUser = useSelector((store) => store.teamList);

  useEffect(() => {
    // console.log("in use effect");
    // console.log('in fetch Team API data')

    dispatch({
      type: "FETCH_TEAM_LIST",
    });

    dispatch({
      type: "FETCH_TYPE_LIST",
    });
  }, []);

  const sortedTeams = createdTeamsByUser.sort(
    (a, b) => b?.metaData.team_id - a?.metaData.team_id
  );

  // console.log('sorted Teams', sortedTeams)

  let teamIDArray = [];
  let LastId = "";
  let TempArray = [];

  for (let teamIndex in sortedTeams) {
    // console.log('team id', createdTeamsByUser[teamIndex]?.metaData.id);
    // console.log('length', createdTeamsByUser.length)
    // console.log('teamIndex', teamIndex)

    if (LastId === "") {
      TempArray.push(sortedTeams[teamIndex]);
      LastId = sortedTeams[teamIndex]?.metaData.team_id;
      // console.log('Last id', LastId);
      // console.log('TempArray', TempArray);
      // console.log('teamIndex', teamIndex)

      if (Number(teamIndex) === sortedTeams.length - 1) {
        teamIDArray.push(TempArray);
      }
    } else if (sortedTeams[teamIndex]?.metaData.team_id === LastId) {
      TempArray.push(sortedTeams[teamIndex]);
      LastId = sortedTeams[teamIndex]?.metaData.team_id;
      // console.log('Last id', LastId);
      // console.log('TempArray', TempArray);
      // console.log('teamIndex', teamIndex)

      if (Number(teamIndex) === sortedTeams.length - 1) {
        teamIDArray.push(TempArray);
      }
    } else {
      teamIDArray.push(TempArray);
      TempArray = [];
      TempArray.push(sortedTeams[teamIndex]);
      LastId = sortedTeams[teamIndex]?.metaData.team_id;
      // console.log('Last id', LastId);
      // console.log('TempArray', TempArray);
      // console.log('teamID Array', teamIDArray);
      // console.log('teamIndex', teamIndex)
      if (Number(teamIndex) === sortedTeams.length - 1) {
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
    type: "SET_SORTED_TEAMS",
    payload: teamIDArray,
  });
  ////--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const capitalize = (lowercase) => {
    let capital = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
    return capital;
  };

  let teamData = analysisTeam?.map((pokemon) => {
    return (
      pokemon.name +
      "\n" +
      pokemon.metaData.moveset.map((move) => {
        return "-" + move + "\n";
      }) +
      "\n"
    );
  });

  let teamDataString = teamData.toString().replaceAll(",", '')

  //Displays Users Analytics page. Teams are now buttons that the user can click to enter analytics on that specific Team.
  return (
    <div className="container">
      <div className="analysis-teams-title">
        <div>
          <img src="unown-export.png" width="20%" height="auto" />
        </div>
      </div>

      {isAnalyzing ? (
        <>
          <div
            onClick={() => {
              setIsAnalyzing(false);
            }}
            className="analyze-team-isAnalyzed-style"
          >
            {analysisTeam?.map((pokemon) => {
              return (
                <Card
                  sx={{
                    width: 400,
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" component="div">
                      {capitalize(pokemon.name)}
                    </Typography>

                    <div className="type-flex-style">
                      {pokemon.types?.map((type) => {
                        let type_Image_url = "";
                        for (let dbType of dbTypeList) {
                          if (dbType.name === type.type.name) {
                            // console.log(dbType.image_url);
                            type_Image_url = dbType.image_url;
                          }
                        }

                        return (
                          <CardMedia
                            className="pokemon-image-style"
                            sx={{
                              height: 20,
                              width: "45%",
                              backgroundSize: "contain",
                            }}
                            image={type_Image_url}
                          />
                        );
                      })}
                    </div>
                    <CardMedia
                      className="pokemon-image-style"
                      sx={{
                        height: 70,
                        width: "100%",
                        backgroundSize: "contain",
                      }}
                      image={`https://img.pokemondb.net/artwork/large/${pokemon?.species?.name}.jpg`}
                    />
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              );
            })}
          </div>
          
          <div className="centerwrapper">
            <div className="export-text-body">
              <TextareaAutosize
                minRows={36}
                aria-label="maximum height"
                placeholder="Pokemon-Text-Here"
                defaultValue={teamDataString}
                style={{ width: "75%", }}
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <AnalyzeTeamMenu
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />
        </div>
      )}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default ExportPage;
