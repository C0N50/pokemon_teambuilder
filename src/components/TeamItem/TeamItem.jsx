import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import './TeamItem.css'

/**
 * 
 * @param {object} team 
 * @returns individual pokemon object/card to be displayed in TeamList on User landing page.
 */
function TeamItem({ team }) {

    //calls reducer that stores an individual pokemon object fetched from the api
    // const pokemon = useSelector((store) => store.pokemon);
    // const dispatch = useDispatch();

    // console.log('teamItem', team)

    // console.log('pokemon', team?.species?.name);
    const capitalized = team?.species?.name.charAt(0).toUpperCase() + team?.species?.name.slice(1);
    const imageURL = `https://img.pokemondb.net/artwork/large/${team?.species?.name}.jpg`;

    console.log('team', team)
    // console.log('pokemon names', TeamItem);

    // console.log('pokemon', pokemon)
    // console.log('species', pokemon.species?.name)


    // const capitalized = pokemon.species?.name.charAt(0).toUpperCase() + pokemon.species?.name.slice(1);
    // const species = pokemon.species?.name;
    // const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon.species?.name}.jpg`

    console.log('team', team);
    console.log('types', team.types);


    return (

        <Card sx={{ width: 400 }}>
            <CardContent>



                <Typography variant="h6" component="div">
                    {capitalized}
                </Typography>

                <div className='type-flex-style'>
                    {team.types?.map((type) => {
                        return (
                            <CardMedia className='pokemon-image-style' sx={{
                                height: 20,
                                width: '45%',
                                backgroundSize: 'contain',
                            }} image={'https://archives.bulbagarden.net/media/upload/2/2c/GhostIC_SV.png'} />
                        )
                    })}
                </div>
                <CardMedia className='pokemon-image-style' sx={{
                    height: 100,
                    width: '100%',
                    backgroundSize: 'contain',
                }} image={imageURL} />

                <div className='move-grid-style'>
                    <Typography className='Move-1' variant="body2">
                        Move 1
                    </Typography>
                    <Typography className='Move-2' variant="body2">
                        Move 2
                    </Typography>
                    <Typography className='Move-3' variant="body2">
                        Move 3
                    </Typography>
                    <Typography className='Move-4' variant="body2">
                        Move 4
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>

    )
}

export default TeamItem;