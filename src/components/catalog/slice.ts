import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import kick from "@assets/YSueH.jpg";

const sampleProducts = [
    {
        id: 1,
        image: kick,
        name: "Aegis Boost 2",
        category: "vapes",
        items: [
            { id: 1, name: "Красный", availability: 69 },
            { id: 2, name: "Синий", availability: 3 },
            { id: 3, name: "Золотистый", availability: 23 },
            { id: 4, name: "Сиреневый", availability: 0 },
        ],
    },
    {
        id: 2,
        image: kick,
        name: "XYLINET Tebe Pizda 50мг",
        category: "liquids",
        items: [
            { id: 1, name: "Клубничный минет", availability: 69 },
            { id: 2, name: "Клубничный денис", availability: 3 },
            { id: 3, name: "Денисова клубника мороженная", availability: 23 },
            { id: 4, name: "Денисов минет", availability: 0 },
            { id: 5, name: "Денисов минет", availability: 0 },
            { id: 6, name: "Денисов минет", availability: 0 },
            { id: 7, name: "Денисов минет", availability: 23 },
            { id: 8, name: "Денисов минет", availability: 6 },
            { id: 9, name: "Денисов минет", availability: 4 },
            { id: 10, name: "Денисов минет", availability: 2 },
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
                currentProduct.items.sort((a: any, b: any) => b.availability - a.availability);

                const itemsAvailabilitySum = currentProduct.items.reduce(
                    (sum: any, item: any) => sum + item.availability,
                    0
                );

                currentProduct.itemsAvailabilitySum = itemsAvailabilitySum;
            }
            state.currentProduct = currentProduct;
        },
        closeCurrentProduct: (state) => {
            state.currentProduct = null;
        },
    },
});

export const { filterProducts, setCategory, setSearchQuery, getCurrentProduct, closeCurrentProduct } =
    catalogSlice.actions;

export default catalogSlice.reducer;
