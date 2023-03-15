import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import SelectedTeam from '../SelectedTeam/SelectedTeam';
import './TeamEditPage.css'

/**
 * Seperate view routed to when user clicks 'Create New Team Button' or edits an already created team by clicking the 'edit' button.
 */
function TeamEditPage() {

    // this component doesn't do much to start, just renders some user reducer info to the DOM

    const user = useSelector((store) => store.user);
    const team = useSelector((store) => store.selectedTeam);
 
    console.log('selected Team is', team);


    return (
        <div className="container">
            < SelectedTeam team={team} />
            
            <AllPokemonList />
        </div>
    );
}

// this allows us to use <App /> in index.js
export default TeamEditPage;
