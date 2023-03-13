import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


function TeamItem({ team }) {

    //calls reducer that stores an individual pokemon object fetched from the api
    // const pokemon = useSelector((store) => store.pokemon);
    // const dispatch = useDispatch();

    // console.log('teamItem', team)

    // console.log('pokemon', team?.species?.name);
    const capitalized = team?.species?.name.charAt(0).toUpperCase() + team?.species?.name.slice(1);
    const imageURL = `https://img.pokemondb.net/artwork/large/${team?.species?.name}.jpg`;

    // console.log('team', team)
    // console.log('pokemon names', TeamItem);

    // console.log('pokemon', pokemon)
    // console.log('species', pokemon.species?.name)


    // const capitalized = pokemon.species?.name.charAt(0).toUpperCase() + pokemon.species?.name.slice(1);
    // const species = pokemon.species?.name;
    // const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon.species?.name}.jpg`



    return (

        <Card sx={{ width: 400 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {capitalized}
                </Typography>
                <CardMedia sx={{
                    height: 100,
                    width: '100%',
                    backgroundSize: 'contain',
                }} image={imageURL} />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {capitalized}
                </Typography>
                <Typography variant="body2">
                    {capitalized}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{team?.species?.name}</Button>
            </CardActions>
        </Card>

    )
}

export default TeamItem;