import React from "react";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="background"></div>
      <div className="content">
        <PokemonList />
        <PokemonDetails />
      </div>
    </div>
  );
};

export default App;
