import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import SelectedTeam from '../SelectedTeam/SelectedTeam';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function PokemonEditPage ({handlePokemonEditClick, team}) {


    const saveChanges = () => {
        console.log('TO ADD: SAVING THE CHANGES');
        handlePokemonEditClick();
    }

    return (
        <>
        <h1>Pokemon Edit Page Here</h1>

        <SelectedTeam team={team} handlePokemonEditClick={handlePokemonEditClick}/>

        <div className="button-flex">
        <Button onClick={handlePokemonEditClick}>Cancel</Button>
        <Button onClick={saveChanges}>Save</Button>
        </div>
        </>
    )
}


export default PokemonEditPage;