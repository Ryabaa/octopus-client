import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartState } from "./types";

import { calculateMix } from "@utils/calculateMix";
import { getLocalStorage, setLocalStorage } from "@utils/localStorage";

const initialState: CartState = {
    items: JSON.parse(getLocalStorage("cartItems") || "[]"),
    productCount: JSON.parse(getLocalStorage("productCount") || "{}"),
    cartCount: JSON.parse(getLocalStorage("cartCount") || "0"),
    cartPrice: 0,
    isCartOpened: false,
    insufficientProducts: [],
    pendingUpdates: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateItemCount(state, action: PayloadAction<{ productId: string; itemId: string; count: number }>) {
            const { productId, itemId, count } = action.payload;

            const existingItem = state.items.find(
                (item) => item.productId === productId && item.itemId === itemId
            );

            if (existingItem) {
                if (count !== 0) {
                    existingItem.count = count;
                } else {
                    state.items = state.items.filter(
                        (item) => item.productId !== productId || item.itemId !== itemId
                    );
                }
            } else if (count > 0) {
                state.items.push({ productId, itemId, count });
            }

            const isAuthorized = getLocalStorage("isAuthorized");
            if (!isAuthorized) {
                setLocalStorage("cartItems", JSON.stringify(state.items));
            }
        },

        updateMixCount(
            state,
            action: PayloadAction<{
                productId: string;
                items: any;
                desiredTotal: number;
            }>
        ) {
            const { productId, items, desiredTotal } = action.payload;
            const mix = calculateMix(items, desiredTotal);

            mix.forEach((mixItem) => {
                const existingItem = state.items.find(
                    (item) => item.productId === productId && item.itemId === mixItem.id
                );

                if (existingItem) {
                    existingItem.count = mixItem.count;
                } else {
                    state.items.push({
                        productId,
                        itemId: mixItem.id,
                        count: mixItem.count,
                    });
                }
            });

            state.items = state.items.filter(
                (item) => item.productId !== productId || mix.some((mixItem) => mixItem.id === item.itemId)
            );

            const isAuthorized = getLocalStorage("isAuthorized");
            if (!isAuthorized) {
                setLocalStorage("cartItems", JSON.stringify(state.items));
            }
        },

        updateProductCount(state, action: PayloadAction<{ productId: string }>) {
            const { productId } = action.payload;

            const cartCount = state.items.reduce((total: any, item: any) => total + item.count, 0);
            const productCount = state.items
                .filter((item) => item.productId === productId)
                .reduce((sum, item) => sum + item.count, 0);

            state.productCount[productId] = productCount;
            state.cartCount = cartCount;

            const isAuthorized = getLocalStorage("isAuthorized");
            if (!isAuthorized) {
                setLocalStorage("productCount", JSON.stringify(state.productCount));
                setLocalStorage("cartCount", JSON.stringify(state.cartCount));
            }

            state.pendingUpdates = state.items;
        },

        resetProductItems(state, action: PayloadAction<{ productId: number }>) {
            const { productId } = action.payload;

            state.items = state.items.filter((item) => Number(item.productId) !== productId);

            delete state.productCount[String(productId)];

            const isAuthorized = getLocalStorage("isAuthorized");
            if (!isAuthorized) {
                setLocalStorage("cartItems", JSON.stringify(state.items));
                setLocalStorage("productCount", JSON.stringify(state.productCount));
                setLocalStorage("cartCount", JSON.stringify(state.cartCount));
            }
        },

        setCartOpened(state) {
            state.isCartOpened = true;
        },
        setCartClosed(state) {
            state.isCartOpened = false;
        },

        fetchCartSuccess(state, action: any) {
            const { cart, cartPrice, insufficientProducts, cartCount, productCount } = action.payload;

            state.pendingUpdates = state.pendingUpdates.filter((pending) =>
                cart.some(
                    (p: any) =>
                        p.productId === pending.productId &&
                        p.itemId === pending.itemId &&
                        p.count !== pending.count
                )
            );

            if (state.pendingUpdates.length === 0) {
                state.items = cart;
                state.cartPrice = cartPrice;
                state.insufficientProducts = insufficientProducts;
                state.cartCount = cartCount;
                state.productCount = productCount;
            }
        },
    },
});

export const {
    updateItemCount,
    resetProductItems,
    updateMixCount,
    updateProductCount,
    fetchCartSuccess,
    setCartOpened,
    setCartClosed,
} = cartSlice.actions;
export default cartSlice.reducer;
