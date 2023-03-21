import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";


/**
 * 
 * @param {object} Move 
 * @returns individual pokemon object/card to be displayed in TeamList on User landing page.
 */
function MoveItem({ move }) {

    //calls reducer that stores an individual pokemon object fetched from the api
    // const dbTypeList = useSelector((store) => store.typeList);
    // console.log('type database', dbTypeList)
    const dispatch = useDispatch();

    const moveReducer = useSelector((store) => store.moves);
    const moveDataReducer = useSelector((store) => store.moveData);

    const capitalized = move.move.name?.charAt(0).toUpperCase() + move.move.name?.slice(1);
    // const species = pokemon.species?.name;
    // const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon.species?.name}.jpg`

    // console.log('team', move);

    // console.log('moveReducer', moveReducer);

    const handleAddMove = () => {
        console.log('clicked add move')

        // console.log('move.move.name', move.move.name);

        if (moveReducer.length < 4) {

            fetchMoveData()
                .then(() => {

                    axios.get('/api/move/apiURL', { params: { paramsURL: move.move.name } })
                        .then((result) => {

                            // console.log('result', result.data.type);


                            dispatch({
                                type: 'ADD_MOVE',
                                payload: { name: move.move.name, type: result.data.type}
                            })
                        })



                })
        }
    }


    const fetchMoveData = () => new Promise((resolve) => {
        // do anything here
        dispatch({
            type: 'FETCH_MOVE_DATA',
            payload: move.move.name
        })
        resolve();
    });

    return (

        <Card sx={{
            width: 400,
            boxShadow: 2
        }}>
            <CardContent>

                <Typography variant="h4" component="div">
                    {capitalized}
                </Typography>

            </CardContent>
            <CardActions>
                <Button onClick={handleAddMove} variant='contained' size="medium">Add</Button>
                <Button size="small">Details</Button>
            </CardActions>
        </Card>

    )
}

export default MoveItem;