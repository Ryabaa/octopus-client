export type CartItem = {
    productId: string;
    itemId: string;
    count: number;
};

export type InsufficientProduct = {
    productId: number;
    minCount: number;
};

export type CartState = {
    items: CartItem[];
    isCartOpened: boolean;
    productCount: Record<string, number>;
    cartPrice: number;
    cartCount: number;
    insufficientProducts: InsufficientProduct[];
    pendingUpdates: CartItem[];
};
