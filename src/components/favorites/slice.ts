import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
    favorites: number[];
}

const initialState: FavoritesState = {
    favorites: [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            if (state.favorites.includes(action.payload)) {
                state.favorites = state.favorites.filter((id) => id !== action.payload);
            } else {
                state.favorites.push(action.payload);
            }
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
