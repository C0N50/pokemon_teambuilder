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
    const dbTypeList = useSelector((store) => store.typeList);
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

    // console.log('team', team);
    // console.log('types', team.types);

    // console.log('type database', dbTypeList)


    const capitalize = (lowercase) => {
        let capital = lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
        return capital;
    }


    return (

        <Card sx={{
            width: 400,
            boxShadow: 3
        }}>
            <CardContent>

                <Typography variant="h6" component="div">
                    {capitalized}
                </Typography>

                <div className='type-flex-style'>
                    {team.types?.map((type) => {

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
                            }} image={type_Image_url}
                            />
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
                            {team?.selectedAttacks && team.selectedAttacks[0] ?
                                <>
                                    <div>{capitalize(team.selectedAttacks[0])}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                    <Typography className='Move-2' variant="caption">
                        <div className='move-body'>
                            {team?.selectedAttacks && team.selectedAttacks[1] ?
                                <>
                                    <div>{capitalize(team.selectedAttacks[1])}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                    <Typography className='Move-3' variant="caption">
                        <div className='move-body'>
                            {team?.selectedAttacks && team.selectedAttacks[2] ?
                                <>
                                    <div>{capitalize(team.selectedAttacks[2])}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                    <Typography className='Move-4' variant="caption">
                        <div className='move-body'>
                            {team?.selectedAttacks && team.selectedAttacks[3] ?
                                <>
                                    <div>{capitalize(team.selectedAttacks[3])}</div>
                                </>
                                : <div></div>}
                        </div>
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>

    )
}

export default TeamItem;