// src/components/PokemonList.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPokemonListQuery } from "../store/pokemonApi";
import { setSelectedPokemon } from "../store/pokemonSlice";
import { toTitleCase } from "../utils";
import { RootState } from "../store";
import usePokemonImages from "../hooks/usePokemonImages";
import { Pokemon } from "../types/pokemon";

const PokemonList: React.FC = () => {
  const { data, error } = useGetPokemonListQuery();
  const dispatch = useDispatch();
  const selectedPokemonUrl = useSelector(
    (state: RootState) => state.pokemon.selectedPokemon
  );
  const pokemonImages = usePokemonImages(data?.results);

  if (error) return <div>Error fetching data</div>;

  return (
    <div className="left">
      <img src="logo.png" alt="Pokemon Logo" width="120" height="120" />
      <div className="sidebar">
        <PokemonListItems
          pokemonList={data?.results}
          selectedPokemonUrl={selectedPokemonUrl}
          pokemonImages={pokemonImages}
          onSelect={(url: string) => dispatch(setSelectedPokemon(url))}
        />
      </div>
    </div>
  );
};

interface PokemonListItemsProps {
  pokemonList: Pokemon[] | undefined;
  selectedPokemonUrl: string | null;
  pokemonImages: { [key: string]: string };
  onSelect: (url: string) => void;
}

const PokemonListItems: React.FC<PokemonListItemsProps> = ({
  pokemonList,
  selectedPokemonUrl,
  pokemonImages,
  onSelect,
}) => (
  <div className="p-list">
    {pokemonList?.map((pokemon, index) => (
      <span
        className={`p-item ${pokemon.url === selectedPokemonUrl ? "selected" : ""}`}
        key={index}
        onClick={() => onSelect(pokemon.url)}
      >
        {pokemonImages[pokemon.url] && (
          <img
            src={pokemonImages[pokemon.url]}
            alt={pokemon.name}
            width={40}
            height={40}
          />
        )}
        {toTitleCase(pokemon.name)}
      </span>
    ))}
  </div>
);

export default PokemonList;
