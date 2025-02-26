import { removeLocalStorage } from "@utils/localStorage";

export const resetLocalCartData = () => {
    removeLocalStorage("cartItems");
    removeLocalStorage("productCount");
    removeLocalStorage("cartCount");
};
