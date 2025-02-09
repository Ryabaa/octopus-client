import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./types";
import { calculateMix } from "@utils/calculateMix";

const initialState: CartState = {
    items: [],
    isCartOpened: false,
    productCount: {},
    cartCount: 0,
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
        },

        updateMixCount(
            state,
            action: PayloadAction<{ productId: string; items: any; desiredTotal: number }>
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
        },

        updateProductCount(state, action: PayloadAction<{ productId: string }>) {
            const { productId } = action.payload;

            const cartCount = state.items.reduce((total: any, item: any) => total + item.count, 0);
            const productCount = state.items
                .filter((item) => item.productId === productId)
                .reduce((sum, item) => sum + item.count, 0);

            state.productCount[productId] = productCount;
            state.cartCount = cartCount;
        },

        resetProductItems(state, action: PayloadAction<{ productId: number }>) {
            const { productId } = action.payload;

            state.items = state.items.filter((item) => Number(item.productId) !== productId);
            delete state.productCount[String(productId)];
        },

        setCartOpened(state) {
            state.isCartOpened = true;
        },
        setCartClosed(state) {
            state.isCartOpened = false;
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const {
    updateItemCount,
    resetProductItems,
    updateMixCount,
    updateProductCount,
    clearCart,
    setCartOpened,
    setCartClosed,
} = cartSlice.actions;
export default cartSlice.reducer;
