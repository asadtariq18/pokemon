import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { pokemonApi } from "./pokemonApi";
import pokemonReducer from "./pokemonSlice";
import pokemonDetailsReducer from "./pokemonDetailsSlice";

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  pokemon: pokemonReducer,
  pokemonDetails: pokemonDetailsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["pokemon", "pokemonDetails"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
