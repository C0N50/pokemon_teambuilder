import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";
import Swal from 'sweetalert2';

/**
 * 
 * @param {object} pokemon 
 * @returns individual Pokemon to be displayed on edit in Allpokemon List.
 */
function AllPokemonItem(pokemon) {

    const dispatch = useDispatch();

    const capitalized = pokemon.pokemon.name.charAt(0).toUpperCase() + pokemon.pokemon.name.slice(1);
    const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon.pokemon.name}.jpg`


    const team = useSelector((store) => store.selectedTeam);
    const [selectedPokemon, setSelectedPokemon] = useState({})
    
    

    const handleAdd = () => {

        if (team.length < 6) {

        //Interchangable URL & name depending on the functionality of the pokeAPI

        let pokemonUrl = pokemon.pokemon.url;
                // console.log('pokemon url', pokemonUrl)

        let pokemonName = pokemon.pokemon.name
                // console.log('pokemon name', pokemonName)


        axios.get('/api/pokemon/apiURL', { params: { paramsURL: pokemonName } })
            .then(response => {
                // console.log(response.data);

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
            Swal.fire({
                text:"Team is full!",
                confirmButtonColor:'#FF0000' })
        }
    }





    return (
        <Card sx={{ 
            boxShadow: 2,
            width: 400 
            }}>
            <CardContent>
                <Typography variant="h6" component="div">
                    {capitalized}
                </Typography>
                <CardMedia sx={{
                    height: 100,
                    width: '100%',
                    backgroundSize: 'contain',
                }} image={imageURL} />
            </CardContent>
            <CardActions>
                <Button onClick={handleAdd} variant='contained' size="medium">Add</Button>
                <Button size="small">Details</Button>
            </CardActions>
        </Card>

    )

}

export default AllPokemonItem;