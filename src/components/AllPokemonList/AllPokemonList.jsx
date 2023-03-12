import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllPokemonItem from "../AllPokemonItem/AllPokemonItem";
import "./AllPokemonList.css";

function AllPokemonList() {

    const dispatch = useDispatch();
    const allPokemonList  = useSelector((store) => store.allPokemonList.results);
    const user = useSelector((store) => store.user);
  
    useEffect(() => {
      console.log("in use effect");
      dispatch({
        type: "FETCH_ALL_POKEMON",
      });
    }, []);
  
    console.log('pokemon list', allPokemonList);

    return (
        <section className="all-pokemon-list-style">
        {allPokemonList?.map((pokemon) => {
                return <AllPokemonItem key={pokemon.id} pokemon={pokemon} />;
        })}
      </section>
    )
}

export default AllPokemonList;