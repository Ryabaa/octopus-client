import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "@components/auth/slice";
import catalogSlice from "@components/catalog/slice";

const rootReducer = combineReducers({
    auth: authSlice,
    catalog: catalogSlice,
});

export default rootReducer;
