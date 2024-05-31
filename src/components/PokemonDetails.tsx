import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetPokemonDetailsQuery } from "../store/pokemonApi";
import { toTitleCase } from "../utils";
import {
  PokemonType,
  PokemonAbility,
  PokemonStat,
  PokemonMove,
} from "../types/pokemon";

const PokemonDetails: React.FC = () => {
  const selectedPokemonUrl = useSelector(
    (state: RootState) => state.pokemon.selectedPokemon
  );
  const pokemonId = selectedPokemonUrl?.split("/").filter(Boolean).pop();
  const { data, error, isLoading } = useGetPokemonDetailsQuery(
    Number(pokemonId),
    {
      skip: !pokemonId,
    }
  );

  const playCrySound = () => {
    if (data?.cries) {
      const audio = new Audio(data.cries.latest);
      audio.play();
    }
  };

  if (!pokemonId) {
    return <div className="details">Select a Pokemon to see details</div>;
  }

  if (isLoading) {
    return <div className="details"><img src="logo.png" alt="Pokemon Logo" width="120" height="120" />Loading...</div>;
  }

  if (error) {
    return <div className="details">Error fetching data</div>;
  }

  return (
    <div className="details">
      <InfoCard data={data} playCrySound={playCrySound} />
      <StatsCard data={data} />
      <AbilitiesCard data={data} />
      <MovesCard data={data} />
    </div>
  );
};

const InfoCard: React.FC<{ data: any; playCrySound: () => void }> = ({
  data,
  playCrySound,
}) => (
  <div className="info-card">
    <h2>{toTitleCase(data?.name ?? "")}</h2>
    <img
      src={data?.sprites.front_default}
      alt={data?.name}
      onClick={playCrySound}
      width={150}
      height={150}
    />
    {data?.cries && <p className="hint">Hit the Pokemon to make him cry!</p>}
    <CardItem label="Height" value={`${data?.height}cm`} />
    <CardItem label="Weight" value={data?.weight} />
    <p>Types</p>
    <p>{data?.types.map((type: PokemonType) => type.type.name).join(", ")}</p>
  </div>
);

const StatsCard: React.FC<{ data: any }> = ({ data }) => (
  <div className="stats-card">
    <h3>Stats</h3>
    <div>
      {data?.stats.map((stat: PokemonStat, index: number) => (
        <CardItem key={index} label={stat.stat.name} value={stat.base_stat} />
      ))}
    </div>
  </div>
);

const AbilitiesCard: React.FC<{ data: any }> = ({ data }) => (
  <div className="abilities-card">
    <h3>Abilities</h3>
    <div>
      {data?.abilities.map((ability: PokemonAbility, index: number) => (
        <CardItem key={index} label={ability.ability.name} />
      ))}
    </div>
  </div>
);

const MovesCard: React.FC<{ data: any }> = ({ data }) => (
  <div className="moves-card">
    <h3>Moves ({data?.moves.length})</h3>
    <div>
      {data?.moves.map((move: PokemonMove, index: number) => (
        <CardItem key={index} label={move.move.name} />
      ))}
    </div>
  </div>
);

const CardItem: React.FC<{ label: string; value?: any }> = ({
  label,
  value,
}) => (
  <span className="card-item">
    <p>{label}</p>
    <p>{value}</p>
  </span>
);

export default PokemonDetails;
