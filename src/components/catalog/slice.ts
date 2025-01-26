import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import kick from "@assets/YSueH.jpg";

const sampleProducts = [
    { id: 1, image: kick, amount: 17, name: "Aegis Boost 2", category: "vapes" },
    {
        id: 2,
        image: kick,
        amount: 17,
        name: "XYLINET Tebe Pizda 50мг",
        category: "liquids",
        cards: [
            { id: 1, name: "Клубничный минет", amount: 69, count: 0 },
            { id: 2, name: "Клубничный денис", amount: 69, count: 0 },
            { id: 3, name: "Денисова клубника", amount: 69, count: 0 },
            { id: 4, name: "Денисов минет", amount: 69, count: 0 },
        ],
    },
];

const authInitialState: any = {
    products: sampleProducts,
    filteredProducts: [],
    favorites: [],
    category: "all",
    searchQuery: "",
    itemDetailed: null,
    isItemDetailedOpen: false,
};

export const catalogSlice = createSlice({
    name: "Catalog",
    initialState: authInitialState,
    reducers: {
        filterProducts: (state) => {
            const filteredProducts =
                state.products.filter(
                    (product: any) =>
                        (state.category === "all" || product.category === state.category) &&
                        product.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                ) || [];

            state.filteredProducts = [...filteredProducts];
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        getItemDetailed: (state, action: PayloadAction<number>) => {
            const itemDetailed = state.products.find((product: any) => product.id === action.payload);

            state.isItemDetailedOpen = true;
            state.itemDetailed = itemDetailed;
        },
        closeItemDetailed: (state) => {
            state.isItemDetailedOpen = false;
            state.itemDetailed = null;
        },
    },
});

export const { filterProducts, setCategory, setSearchQuery, getItemDetailed, closeItemDetailed } =
    catalogSlice.actions;

export default catalogSlice.reducer;
