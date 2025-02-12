import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "@components/auth/slice";
import catalogSlice from "@components/catalog/slice";
import cartSlice from "@components/cart/slice";
import catalogNavbarSlice from "@components/catalog-navbar/slice";
import favoritesSlice from "@components/favorites/slice";

const rootReducer = combineReducers({
    auth: authSlice,
    catalog: catalogSlice,
    catalogNavbar: catalogNavbarSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
});

export default rootReducer;
