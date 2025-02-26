import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const catalogInitialState: any = {
    products: [],
    filteredProducts: [],
    category: "all",
    searchQuery: "",
    currentProduct: null,
};

export const catalogSlice = createSlice({
    name: "Catalog",
    initialState: catalogInitialState,
    reducers: {
        fetchProductsSuccess(state, action: PayloadAction<any>) {
            state.products = action.payload;
        },
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

export const {
    filterProducts,
    setCategory,
    setSearchQuery,
    getCurrentProduct,
    closeCurrentProduct,
    fetchProductsSuccess,
} = catalogSlice.actions;

export default catalogSlice.reducer;
