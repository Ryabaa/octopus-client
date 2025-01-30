import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import kick from "@assets/YSueH.jpg";
import { calculateMix } from "@utils/calculateMix";

const sampleProducts = [
    { id: 1, image: kick, amount: 17, name: "Aegis Boost 2", category: "vapes" },
    {
        id: 2,
        image: kick,
        amount: 17,
        name: "XYLINET Tebe Pizda 50мг",
        category: "liquids",
        items: [
            { id: 1, name: "Клубничный минет", amount: 69 },
            { id: 2, name: "Клубничный денис", amount: 3 },
            { id: 3, name: "Денисова клубника мороженная", amount: 23 },
            { id: 4, name: "Денисов минет", amount: 0 },
            { id: 5, name: "Денисов минет", amount: 0 },
            { id: 6, name: "Денисов минет", amount: 0 },
            { id: 7, name: "Денисов минет", amount: 23 },
            { id: 8, name: "Денисов минет", amount: 6 },
            { id: 9, name: "Денисов минет", amount: 4 },
            { id: 10, name: "Денисов минет", amount: 2 },
        ],
    },
];

const authInitialState: any = {
    products: sampleProducts,
    filteredProducts: [],
    favorites: [],
    category: "all",
    searchQuery: "",
    currentProduct: null,
    isCurrentProductOpen: false,
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
        getCurrentProduct: (state, action: PayloadAction<number>) => {
            const currentProduct = state.products.find((product: any) => product.id === action.payload);
            if (currentProduct && currentProduct.items) {
                currentProduct.items.sort((a: any, b: any) => b.amount - a.amount);
            }
            state.isCurrentProductOpen = true;
            state.currentProduct = currentProduct;
        },
        closeCurrentProduct: (state) => {
            state.isCurrentProductOpen = false;
            state.currentProduct = null;
        },
    },
});

export const { filterProducts, setCategory, setSearchQuery, getCurrentProduct, closeCurrentProduct } =
    catalogSlice.actions;

export default catalogSlice.reducer;
