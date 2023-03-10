import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";


function AllPokemonItem(pokemon) {

    const dispatch = useDispatch();
    // console.log('pokemon', pokemon)
    // console.log('pokemon names', pokemon.pokemon.name)
    const capitalized = pokemon.pokemon.name.charAt(0).toUpperCase() + pokemon.pokemon.name.slice(1);
    const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon.pokemon.name}.jpg`


    const team = useSelector((store) => store.selectedTeam);
    const [selectedPokemon, setSelectedPokemon] = useState({})

    const handleAdd = () => {

        if (team.length < 6) {



        console.log('clicked add')

        console.log('pokemon url', pokemon.pokemon.url);
        let pokemonUrl = pokemon.pokemon.url;
        console.log('pokemonURL', pokemonUrl);

        axios.get('/api/pokemon/apiURL', { params: { paramsURL: pokemonUrl } })
            .then(response => {
                console.log(response.data);

                dispatch({
                    type: 'ADD_SELECTED_POKEMON',
                    payload : response.data,
                });


            })
            .catch(err => {
                console.log(err);
            })

        }
        else {
            alert('team is full!')
        }

    }





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
                    {pokemon.pokemon.name}
                </Typography>
                <Typography variant="body2">
                    {pokemon.pokemon.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleAdd} variant='contained' size="medium">Add</Button>
                <Button size="small">Details</Button>
            </CardActions>
        </Card>

    )

}

export default AllPokemonItem;