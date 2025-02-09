export type CartItem = {
    productId: string;
    itemId: string;
    count: number;
};

export type CartState = {
    items: CartItem[];
    isCartOpened: boolean;
    productCount: Record<string, number>;
    cartCount: number;
};
