import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import TeamList from "../TeamList/TeamList";


function CreatedTeamsByUserList () {

    const createdTeamsByUser = useSelector((store) => store.teamList);

    console.log('createdTeamsByUser', createdTeamsByUser);

    return (
        <>
        <div>List of Teams Here</div>
        < TeamList createdTeamsByUser={createdTeamsByUser} />
        </>
    )
    
}

export default CreatedTeamsByUserList;