import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import { AuthFormType, AuthAccessTokenType } from "./types";
import { authErrorAction, authUserSuccessAction, loginUserAction, registerUserAction } from "./slice";
import { loginUserApi, registerUserApi } from "./api";

import getErrorMessage from "@utils/getErrorMessage";

function* registerUserSaga({ payload: formData }: PayloadAction<AuthFormType>) {
    try {
        const res: AxiosResponse<AuthAccessTokenType> = yield call(registerUserApi, formData);
        yield put(authUserSuccessAction(res.data));
    } catch (error) {
        yield put(authErrorAction());
        getErrorMessage(error);
    }
}

function* loginUserSaga({ payload: formData }: PayloadAction<AuthFormType>) {
    try {
        const res: AxiosResponse<AuthAccessTokenType> = yield call(loginUserApi, formData);
        yield put(authUserSuccessAction(res.data));
    } catch (error) {
        yield put(authErrorAction());
        getErrorMessage(error);
    }
}

export function* watchAuthUser() {
    yield takeEvery(loginUserAction.type, loginUserSaga);
    yield takeEvery(registerUserAction.type, registerUserSaga);
}
