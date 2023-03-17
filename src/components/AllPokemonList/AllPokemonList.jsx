import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllPokemonItem from "../AllPokemonItem/AllPokemonItem";
import "./AllPokemonList.css";

/**
 * Fetches Pokemon from API. Fetches only pokemon name and URL to info object.
 * @returns List of All pokemon to be displayed on edit page for user to chose to add the page.
 */
function AllPokemonList() {

  const dispatch = useDispatch();
  const allPokemonList = useSelector((store) => store.allPokemonList.results);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    console.log("in use effect");
    dispatch({
      type: "FETCH_ALL_POKEMON",
    });

    dispatch({
      type: 'FETCH_TYPE_LIST',
    });
  }, []);

  // console.log('pokemon list', allPokemonList);

  return (
    <section className="all-pokemon-list-style">

      

      {allPokemonList?.map((pokemon) => {
        return <AllPokemonItem key={pokemon.name} pokemon={pokemon} />;
      })}
    </section>
  )
}

export default AllPokemonList;