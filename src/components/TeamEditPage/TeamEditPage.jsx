import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import SelectedTeam from '../SelectedTeam/SelectedTeam';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './TeamEditPage.css'

/**
 * Seperate view routed to when user clicks 'Create New Team Button' or edits an already created team by clicking the 'edit' button.
 */
function TeamEditPage() {

    // this component doesn't do much to start, just renders some user reducer info to the DOM

    const [searchbarQuery, setsearchbarQuery] = useState("");
    const [searchParam] = useState(["pokemon", "species"]);

    const user = useSelector((store) => store.user);
    const team = useSelector((store) => store.selectedTeam);

    console.log('selected Team is', team);

    const [pokemonEditFlag, setPokemonEditFlag] = useState(false);

    handlePokemonEditClick = () => {
        setPokemonEditFlag(!pokemonEditFlag);
        console.log('pokemon edit mode?', pokemonEditFlag)
    }


    return (
        <div className="container">

            <div className="button-menu">

                <div className="home-button">
                    <Button component={Link} to="/user">
                        Home
                    </Button>
                </div>
            </div>


            <div className="search-wrapper">
                <label htmlFor="search-form">
                    <TextField
                        type="search"
                        name="search-form"
                        id="search-form"
                        className="search-input"
                        placeholder="Search for..."
                        sx={{ 
                            width: 1100 ,
                            bgcolor : 'white',
                        }}
                        value={searchbarQuery}
                        /*
                        // set the value of our useState q
                        //  anytime the user types in the search box
                        */
                        onChange={(e) => setsearchbarQuery(e.target.value)}
                    />
                    <span className="sr-only"></span>
                </label>
            </div>


            < SelectedTeam team={team} handlePokemonEditClick={handlePokemonEditClick}/>


            <AllPokemonList />

            <PokemonEditPage/>

        </div>    );
}

// this allows us to use <App /> in index.js
            export default TeamEditPage;
