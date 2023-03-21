import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import AllPokemonList from '../AllPokemonList/AllPokemonList';
import SelectedTeam from '../SelectedTeam/SelectedTeam';
import SelectedTeamPokemon from '../SelectedTeamPokemon/SelectedTeamPokemon';

import { Link } from 'react-router-dom';

import PokemonMoveList from '../PokemonMoveList/PokemonMoveList';
import './PokemonEditPage.css'

//MUI imports
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function PokemonEditPage({ setPokemonEditFlag, pokemonEditFlag }) {

    const dispatch = useDispatch();
    const selectedPokemon = useSelector((store) => store.selectedPokemon);

    const selectedTeam = useSelector((store) => store.selectedTeam);

    const moves = useSelector((store) => store.moves);
    const dbTypeList = useSelector((store) => store.typeList);

    const handleCancel = () => {
        setPokemonEditFlag(!pokemonEditFlag);
    }

    const handlesaveChanges = () => {

        for (let teamPokemon of selectedTeam) {
            if (selectedPokemon.id === teamPokemon.id) {
                // let moveNames = [];
                // for (let move of moves) {
                //     console.log('move in handlesaveChanges', move)
                //     moveNames.push(move.name);
                // }

                teamPokemon.selectedAttacks = moves;
            }
        }


        // console.log('selectedTeam', selectedTeam)

        dispatch({
            type: 'DELETE_ALL_MOVES'
        })

        console.log('moves', moves)

        setPokemonEditFlag(!pokemonEditFlag);

    }





    const capitalized = selectedPokemon?.species?.name.charAt(0).toUpperCase() + selectedPokemon?.species?.name.slice(1);
    const imageURL = `https://img.pokemondb.net/artwork/large/${selectedPokemon?.species?.name}.jpg`;

    const capitalize = (lowercase) => {
        let capital = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        return capital;
    }

    const handleRemoveMove = (index) => {
        if (moves[index]) {
            dispatch({
                type: 'DELETE_MOVE',
                payload: moves[index]
            })
        }
    }

    return (
        <>
            <div className="pokemon-card">
                <Card sx={{
                    width: '75%',
                    boxShadow: 3
                }}>
                    <CardContent>


                        <div className='type-flex-style-edit'>
                        <Typography variant="h4" component="div">
                            {capitalized}
                        </Typography>
                            {selectedPokemon.types?.map((type) => {

                                let type_Image_url = '';
                                for (let dbType of dbTypeList) {
                                    if (dbType.name === type.type.name) {
                                        // console.log(dbType.image_url);
                                        type_Image_url = dbType.image_url;
                                    }
                                }

                                return (
                                    <CardMedia className='pokemon-type-image-style' sx={{
                                        height: 20,
                                        width: '20%',
                                        backgroundSize: 'contain',
                                    }} image={type_Image_url} />
                                )
                            })}
                        </div>

                        <div className='image-stats-misc-grid'>
                            <CardMedia className='pokemon-image-style' sx={{
                                height: 150,
                                width: '100%',
                                backgroundSize: 'contain',
                            }} image={imageURL} />

                            <Typography className='hp' variant="body1">
                                <div className='stat-body'>
                                    <div>HP:</div>
                                    <div>{selectedPokemon.stats[0].base_stat}</div>
                                </div>
                            </Typography>

                            <Typography className='attack' variant="body1">
                                <div className='stat-body'>
                                    Attack
                                    <div>{selectedPokemon.stats[1].base_stat}</div>
                                </div>
                            </Typography>

                            <Typography className='defense' variant="body1">
                                <div className='stat-body'>
                                    Defense
                                    <div>{selectedPokemon.stats[2].base_stat}</div>
                                </div>
                            </Typography>

                            <Typography className='special-attack' variant="body1">
                                <div className='stat-body'>
                                    Special Attack
                                    <div>{selectedPokemon.stats[3].base_stat}</div>
                                </div>
                            </Typography>

                            <Typography className='special-defense' variant="body1">
                                <div className='stat-body'>
                                    Special Defense
                                    <div>{selectedPokemon.stats[4].base_stat}</div>
                                </div>
                            </Typography>

                            <Typography className='speed' variant="body1">
                                <div className='stat-body'>
                                    Speed
                                    <div>{selectedPokemon.stats[5].base_stat}</div>
                                </div>
                            </Typography>


                        </div>

                        <div className='move-grid-style'>
                            <Typography className='Move-1' variant="h6">
                                <div className='move-body'>
                                    {moves[0] && moves[0].name ?
                                        <>
                                            <div>{capitalize(moves[0].name)}</div>
                                            <div><Button onClick={(() => handleRemoveMove(0))} size="small">Remove</Button></div>
                                        </>
                                        : <div></div>}
                                </div>
                            </Typography>
                            <Typography className='Move-2' variant="h6">
                                <div className='move-body'>
                                    {moves[1] && moves[1].name ?
                                        <>
                                            <div>{capitalize(moves[1].name)}</div>
                                            <div><Button onClick={(() => handleRemoveMove(1))} size="small">Remove</Button></div>
                                        </>
                                        : <div></div>}
                                </div>
                            </Typography>
                            <Typography className='Move-3' variant="h6">
                                <div className='move-body'>
                                    {moves[2] && moves[2].name ?
                                        <>
                                            <div>{capitalize(moves[2].name)}</div>
                                            <div><Button onClick={(() => handleRemoveMove(2))} size="small">Remove</Button></div>
                                        </>
                                        : <div></div>}
                                </div>
                            </Typography>
                            <Typography className='Move-4' variant="h6">
                                <div className='move-body'>
                                    {moves[3] && moves[3].name ?
                                        <>
                                            <div>{capitalize(moves[3].name)}</div>
                                            <div><Button onClick={(() => handleRemoveMove(3))} size="small">Remove</Button></div>
                                        </>
                                        : <div></div>}
                                </div>
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="button-flex">
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button variant={'contained'} onClick={handlesaveChanges}>Save</Button>
                        </div>
                    </CardActions>
                </Card>
            </div>

            <PokemonMoveList />
        </>
    )
}

export default PokemonEditPage;