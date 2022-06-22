import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState(["bulbasaur", "charmander"]);

  const [currentPageURL, setCurrentPageURL] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const [nextPageURL, setNextPageURL] = useState();
  const [prevPageURL, setPrevPageURL] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then((res) => {
      setLoading(false)
      setNextPageURL(res.data.next)
      setPrevPageURL(res.data.previous);
      setPokemon(res.data.results.map((p) => p.name));
    });

    return () => cancel()

  }, [currentPageURL]);

  function gotoNextPage() {
    setCurrentPageURL(nextPageURL)
  }

  function gotoPrevPage() {
    setCurrentPageURL(prevPageURL);
  }

  if (loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination gotoNextPage={nextPageURL ? gotoNextPage : null} gotoPrevPage= {prevPageURL ? gotoPrevPage : null} />
    </>
  );
}

export default App;
