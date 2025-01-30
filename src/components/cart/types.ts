export type CartItem = {
    productId: string;
    itemId: string;
    count: number;
};

export type CartState = {
    items: CartItem[];
    totalAmount: number;
};
