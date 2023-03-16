import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import SelectedTeam from '../SelectedTeam/SelectedTeam';
import SelectedTeamPokemon from '../SelectedTeamPokemon/SelectedTeamPokemon';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function PokemonEditPage ({setPokemonEditFlag, pokemonEditFlag}) {

    const selectedPokemon = useSelector((store) => store.selectedPokemon);

    const handleCancel = () => {
        setPokemonEditFlag(!pokemonEditFlag);
    }

    const handlesaveChanges = () => {
        console.log('TO ADD: SAVING THE CHANGES');
        setPokemonEditFlag(!pokemonEditFlag);
    }

    console.log('selected pokemon', selectedPokemon)

    return (
        <>
        <h1>Pokemon Edit Page Here</h1>

        

        <div className="button-flex">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handlesaveChanges}>Save</Button>
        </div>
        </>
    )
}


export default PokemonEditPage;