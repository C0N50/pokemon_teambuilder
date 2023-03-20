import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import './SelectedTeamPokemon.css'


//
function SelectedTeamPokemon({ pokemon, handlePokemonEditClick }) {

    const dbTypeList = useSelector((store) => store.typeList);
    //calls reducer that stores an individual pokemon object fetched from the api
    // const pokemon = useSelector((store) => store.pokemon);
    const dispatch = useDispatch();

    // console.log('pokemonItem', pokemon)
    // console.log('pokemon type', pokemon.types)
    // console.log('dbtypeList', dbTypeList)

    // console.log('pokemon', pokemon?.species?.name);
    const capitalized = pokemon?.species?.name.charAt(0).toUpperCase() + pokemon?.species?.name.slice(1);
    const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon?.species?.name}.jpg`;

    // console.log('pokemon', pokemon)
    // console.log('pokemon names', TeamItem);

    // console.log('pokemon', pokemon)
    // console.log('species', pokemon.species?.name)


    // const capitalized = pokemon.species?.name.charAt(0).toUpperCase() + pokemon.species?.name.slice(1);
    // const species = pokemon.species?.name;
    // const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon.species?.name}.jpg`

    const handleDelete = () => {
        console.log('in delete pokemon');

        dispatch({
            type: 'DELETE_SELECTED_POKEMON',
            payload: pokemon
        })
    }


    const capitalize = (lowercase) => {
        let capital = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        return capital;
    }


    return (
        <Card className ='selected-card-style' sx={{
            width: 400,
            boxShadow: 3
        }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {capitalized}
                </Typography>
                <div className='type-flex-style'>
                    {pokemon.types?.map((type) => {

                        let type_Image_url = '';
                        for (let dbType of dbTypeList) {
                            if (dbType.name === type.type.name) {
                                // console.log(dbType.image_url);
                                type_Image_url = dbType.image_url;
                            }
                        }

                        return (
                            <CardMedia className='pokemon-image-style' sx={{
                                height: 20,
                                width: '45%',
                                backgroundSize: 'contain',
                            }} image={type_Image_url} />
                        )
                    })}
                </div>
                <CardMedia className='pokemon-image-style' sx={{
                    height: 100,
                    width: '100%',
                    backgroundSize: 'contain',
                }} image={imageURL} />

                <div className='move-flex-style'>
                    <Typography className='Move-1' variant="caption">
                        <div className='move-body'>
                            {pokemon?.selectedAttacks && pokemon.selectedAttacks[0] && pokemon.selectedAttacks[0].name ?
                                <>
                                    <div>{capitalize(pokemon.selectedAttacks[0].name)}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                    <Typography className='Move-2' variant="caption">
                        <div className='move-body'>
                            {pokemon?.selectedAttacks && pokemon.selectedAttacks[1] && pokemon.selectedAttacks[1].name ?
                                <>
                                    <div>{capitalize(pokemon.selectedAttacks[1].name)}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                    <Typography className='Move-3' variant="caption">
                        <div className='move-body'>
                            {pokemon?.selectedAttacks && pokemon.selectedAttacks[2] && pokemon.selectedAttacks[2].name ?
                                <>
                                    <div>{capitalize(pokemon.selectedAttacks[2].name)}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                    <Typography className='Move-4' variant="caption">
                        <div className='move-body'>
                            {pokemon?.selectedAttacks && pokemon.selectedAttacks[3] && pokemon.selectedAttacks[3].name ?
                                <>
                                    <div>{capitalize(pokemon.selectedAttacks[3].name)}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                </div>
            </CardContent>
            <CardActions >
                <div className='card-action-button-style'>
                <Button onClick={(() => handlePokemonEditClick(pokemon))} variant='contained' size="small">Edit</Button>
                <Button onClick={handleDelete} size="small">Delete</Button>
                </div>
            </CardActions>
        </Card>
    )
}

export default SelectedTeamPokemon;