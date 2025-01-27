import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "@components/auth/slice";
import catalogSlice from "@components/catalog/slice";
import cartSlice from "@components/cart/slice";

const rootReducer = combineReducers({
    auth: authSlice,
    catalog: catalogSlice,
    cart: cartSlice,
});

export default rootReducer;
