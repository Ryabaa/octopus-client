import { createSlice } from "@reduxjs/toolkit";

import { CatalogNavbarState } from "./types";

const catalogNavbarInitialState: CatalogNavbarState = {
    isExpanded: true,
};

export const catalogNavbarSlice = createSlice({
    name: "CatalogNavbar",
    initialState: catalogNavbarInitialState,
    reducers: {
        expandCatalogNavbar: (state) => {
            state.isExpanded = true;
        },
        collapseCatalogNavbar: (state) => {
            state.isExpanded = false;
        },
    },
});

export const { expandCatalogNavbar, collapseCatalogNavbar } = catalogNavbarSlice.actions;

export default catalogNavbarSlice.reducer;
