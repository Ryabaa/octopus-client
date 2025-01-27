import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
    itemId: string;
    count: number;
}

interface CartState {
    items: CartItem[];
    totalAmount: number;
}

const initialState: CartState = {
    items: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<{ productId: string; itemId: string }>) {
            const { productId, itemId } = action.payload;

            const existingItem = state.items.find(
                (item) => item.productId === productId && item.itemId === itemId
            );

            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({ productId, itemId, count: 1 });
            }
        },

        removeItem(state, action: PayloadAction<{ productId: string; itemId: string }>) {
            const { productId, itemId } = action.payload;

            const existingItem = state.items.find(
                (item) => item.productId === productId && item.itemId === itemId
            );

            if (existingItem) {
                if (existingItem.count > 1) {
                    existingItem.count -= 1;
                } else {
                    state.items = state.items.filter(
                        (item) => item.productId !== productId || item.itemId !== itemId
                    );
                }
            }
        },
        setManualCount(state, action: PayloadAction<{ productId: string; itemId: string; count: number }>) {
            const { productId, itemId, count } = action.payload;

            const existingItem = state.items.find(
                (item) => item.productId === productId && item.itemId === itemId
            );

            if (existingItem) {
                if (count > 0) {
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

        resetProductItems(state, action: PayloadAction<{ productId: string }>) {
            const { productId } = action.payload;
            state.items = state.items.filter((item) => item.productId !== productId);
        },

        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, setManualCount, resetProductItems, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
