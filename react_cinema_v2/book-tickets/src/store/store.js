import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/auth/authSlice.js";
import favoritesSlice from "../reducers/favorites/favoritesSlice.js";
import accountSlice from "../reducers/account";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesSlice,
    account: accountSlice
  },
});

export default store;
