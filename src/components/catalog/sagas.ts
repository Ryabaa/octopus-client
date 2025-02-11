import { call, put, takeLatest } from "redux-saga/effects";

import { fetchProductsSuccess } from "./slice";
import { fetchProductsApi } from "./api";

import getErrorMessage from "@utils/getErrorMessage";

function* fetchProductsSaga(): any {
    try {
        const res = yield call(fetchProductsApi);
        yield put(fetchProductsSuccess(res.data));
    } catch (error: any) {
        getErrorMessage(error);
    }
}

export function* watchFetchProducts() {
    yield takeLatest("FETCH_PRODUCTS_REQUEST", fetchProductsSaga);
}
