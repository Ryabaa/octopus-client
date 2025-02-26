import { call, put, select, takeEvery, debounce } from "redux-saga/effects";

import { resetProductItems, fetchCartSuccess, updateProductCount } from "./slice";

import { fetchCartApi, updateCartApi } from "./api";

import getErrorMessage from "@utils/getErrorMessage";
import { getLocalStorage } from "@utils/localStorage";
import { resetLocalCartData } from "./helpers";

function* updateCartSaga(): any {
    const isAuthorized = getLocalStorage("isAuthorized");
    if (isAuthorized) {
        const cart = yield select((state: any) => state.cart.items);
        const userId = getLocalStorage("userId");
        const pendingUpdates = yield select((state) => state.cart.pendingUpdates);

        if (pendingUpdates.length === 0) return;

        const cartDto = {
            userId,
            items: cart.map((item: any) => ({
                productId: Number(item.productId),
                itemId: Number(item.itemId),
                count: item.count,
            })),
        };

        try {
            yield call(updateCartApi, cartDto);
            yield put({ type: "FETCH_CART" });
        } catch (error) {
            getErrorMessage("Ошибка при отправке корзины на сервер");
        }
    }
}

function* fetchCartSaga(): any {
    const isAuthorized = getLocalStorage("isAuthorized");
    if (isAuthorized) {
        const userId = getLocalStorage("userId");
        const cartItems = JSON.parse(getLocalStorage("cartItems") || "[]");

        try {
            const res = yield call(fetchCartApi, userId!);

            if (res.cart.length !== 0) {
                yield put(fetchCartSuccess(res));
                resetLocalCartData();
            } else if (cartItems && cartItems.length !== 0) {
                yield put({ type: "UPDATE_CART" });
                resetLocalCartData();
            }
        } catch (error) {
            getErrorMessage("Ошибка получения данных корзины");
        }
    }
}

export function* watchCartSaga() {
    yield debounce(500, ["UPDATE_CART", updateProductCount.type, resetProductItems.type], updateCartSaga);
    yield takeEvery("FETCH_CART", fetchCartSaga);
}
