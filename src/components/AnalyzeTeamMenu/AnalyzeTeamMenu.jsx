import React from "react";
import { useSelector } from "react-redux";
import AnalyzeTeam from "../AnalyzeTeam/AnalyzeTeam";
import '../CreatedTeamsByUserList/CreatedTeamsByUserList.css';


function AnalyzeTeamMenu({ isAnalyzing, setIsAnalyzing}) {

    const analyzeTeamList = useSelector((store) => store.sortedTeam);

return (
    <>
        <section className='created-by-user-list-style' >
            {analyzeTeamList?.map((team) => {
                // console.log('team', team);
                return < AnalyzeTeam key={analyzeTeamList.indexOf(team)} isAnalyzing={isAnalyzing} setIsAnalyzing={setIsAnalyzing} team={team} />

            })}
        </section>
    </>
)

}

export default AnalyzeTeamMenu;