import { useEffect, useState } from "react";
import { Pokemon } from "../types/pokemon";

interface PokemonImages {
  [key: string]: string;
}

const usePokemonImages = (pokemonList: Pokemon[] | undefined) => {
  const [pokemonImages, setPokemonImages] = useState<PokemonImages>({});

  useEffect(() => {
    if (pokemonList) {
      pokemonList.forEach((pokemon) => {
        fetch(pokemon.url)
          .then((response) => response.json())
          .then((details) => {
            setPokemonImages((prev) => ({
              ...prev,
              [pokemon.url]: details.sprites.front_default,
            }));
          });
      });
    }
  }, [pokemonList]);

  return pokemonImages;
};

export default usePokemonImages;
