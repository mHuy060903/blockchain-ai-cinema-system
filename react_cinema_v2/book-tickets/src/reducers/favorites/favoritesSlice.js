import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: JSON.parse(localStorage.getItem("favoritesArr")) || [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  reducers: {
    toggleMovieFavorite: (state, action) => {
      const index = state.movies.findIndex(
        (id) => id === action.payload.movieId
      );
      if (index < 0) {
        state.movies.push(action.payload.movieId);
      } else {
        state.movies.splice(index, 1);
      }
      localStorage.setItem("favoritesArr", JSON.stringify(state.movies));
    },
  },
});
export default favoriteSlice.reducer;
export const { toggleMovieFavorite } = favoriteSlice.actions;
