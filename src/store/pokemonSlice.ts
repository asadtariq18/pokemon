import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  selectedPokemon: string | null;
}

const initialState: PokemonState = {
  selectedPokemon: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.selectedPokemon = action.payload;
    },
  },
});

export const { setSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
