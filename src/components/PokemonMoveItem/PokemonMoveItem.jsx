import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


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

    const capitalized = move.move.name?.charAt(0).toUpperCase() + move.move.name?.slice(1);
    // const species = pokemon.species?.name;
    // const imageURL = `https://img.pokemondb.net/artwork/large/${pokemon.species?.name}.jpg`

    // console.log('team', move);

    // console.log('moveReducer', moveReducer);

    const handleAddMove = () => {
        console.log('clicked add move')

        if (moveReducer.length < 4) {
            dispatch({
                type: 'ADD_MOVE',
                payload: move.move.name
            })
        }
    }


    return (

        <Card sx={{
            width: 400,
            boxShadow: 2
        }}>
            <CardContent>

                <Typography variant="h4" component="div">
                    {capitalized}
                </Typography>

                {/* <div className='type-flex-style'>
                    {team.types?.map((type) => {

                        let type_Image_url = '';
                        for (let dbType of dbTypeList) {
                            if(dbType.name === type.type.name) {
                                console.log(dbType.image_url);
                                type_Image_url = dbType.image_url;
                            }
                        }

                        return (
                            <CardMedia className='pokemon-image-style' sx={{
                                height: 20,
                                width: '45%',
                                backgroundSize: 'contain',
                            }} image={type_Image_url} referrerpolicy="no-referrer"
                             />
                        )
                    })}
                </div> */}
                {/* <CardMedia className='pokemon-image-style' sx={{
                    height: 100,
                    width: '100%',
                    backgroundSize: 'contain',
                }} image={imageURL} /> */}

                {/* <div className='move-grid-style'>
                    <Typography className='move-item-style' variant="body2">
                        {move.move.name}
                    </Typography>

                </div> */}
            </CardContent>
            <CardActions>
                <Button onClick={handleAddMove} variant='contained' size="medium">Add</Button>
                <Button size="small">Details</Button>
            </CardActions>
        </Card>

    )
}

export default MoveItem;