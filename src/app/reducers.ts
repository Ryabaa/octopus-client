import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "@components/auth/slice";
import catalogSlice from "@components/catalog/slice";
import cartSlice from "@components/cart/slice";
import catalogNavbarSlice from "@components/catalog-navbar/slice";

const rootReducer = combineReducers({
    auth: authSlice,
    catalog: catalogSlice,
    catalogNavbar: catalogNavbarSlice,
    cart: cartSlice,
});

export default rootReducer;
