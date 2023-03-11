import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TeamItem from "../TeamItem/TeamItem";

function TeamList() {

    const dispatch = useDispatch();
    const teamList  = useSelector((store) => store.teamList);
    const user = useSelector((store) => store.user);
  
    useEffect(() => {
      console.log("in use effect");
      dispatch({
        type: "FETCH_TEAM_LIST",
      });
    }, []);
  
    console.log('Team list', teamList);

    return (
        <section className="pokemon-list-style">
        {teamList?.map((team) => {
                return <TeamItem key={teamList.indexOf(team)} team={team} />;
        })}
      </section>
    )
}

export default TeamList;