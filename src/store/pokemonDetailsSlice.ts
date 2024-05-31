import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PokemonDetails } from "../types/pokemon";

interface PokemonDetailsState {
  selectedPokemonDetails: PokemonDetails | null;
}

const initialState: PokemonDetailsState = {
  selectedPokemonDetails: null,
};

const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {
    setSelectedPokemonDetails: (
      state,
      action: PayloadAction<PokemonDetails | null>
    ) => {
      state.selectedPokemonDetails = action.payload;
    },
  },
});

export const { setSelectedPokemonDetails } = pokemonDetailsSlice.actions;
export default pokemonDetailsSlice.reducer;
