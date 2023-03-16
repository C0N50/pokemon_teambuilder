import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoveItem from "../PokemonMoveItem/PokemonMoveItem";
import './PokemonMoveList.css'

/**
 * Fetches Moves from Pokemon Reducer Object. Fetches only pokemon name and URL to info object.
 * @returns List of All Moves to be displayed on edit Pokemon page for user to chose to add post pokemon object.
 */
function PokemonMoveList() {


    const selectedPokemon = useSelector((store) => store.selectedPokemon);
    const dispatch = useDispatch();



    const selectedPokemonMoveList = selectedPokemon.moves;
    const user = useSelector((store) => store.user);
    // console.log('selected mon move list', selectedPokemonMoveList)


    return (
        <>
            <section className="selected-move-list-style">
                {selectedPokemonMoveList?.map((move) => {
                    return (
                        <MoveItem move={move} />
                    )
                })}
            </section>


        </>
    )
}

export default PokemonMoveList;