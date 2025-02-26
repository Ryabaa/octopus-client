import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType, AUTH, AuthFormType } from "./types";
import { handleLocalAuthData } from "./helpers";

const authInitialState: AuthStateType = {
    isLoading: false,
    isAuthorized: false,
    isOpened: false,
};

export const authSlice = createSlice({
    name: AUTH,
    initialState: authInitialState,
    reducers: {
        logout: (state: AuthStateType) => {
            state.isAuthorized = false;
            handleLocalAuthData("REMOVE");
        },
        registerUserAction: (state: AuthStateType, {}: PayloadAction<AuthFormType>) => {
            state.isLoading = true;
        },
        loginUserAction: (state: AuthStateType, {}: PayloadAction<AuthFormType>) => {
            state.isLoading = true;
        },
        authUserSuccessAction: (state: AuthStateType, { payload }: PayloadAction<any>) => {
            const { accessToken, refreshToken, userId } = payload;
            state.isAuthorized = true;
            handleLocalAuthData("SET", accessToken, refreshToken, userId, JSON.stringify(state.isAuthorized));
            state.isLoading = false;
        },
        authErrorAction: (state: AuthStateType) => {
            state.isLoading = false;
        },
        setAuthOpened: (state: AuthStateType) => {
            state.isOpened = true;
        },
        setAuthClosed: (state: AuthStateType) => {
            state.isOpened = false;
        },
    },
});

export const {
    logout,
    registerUserAction,
    loginUserAction,
    authUserSuccessAction,
    authErrorAction,
    setAuthOpened,
    setAuthClosed,
} = authSlice.actions;

export default authSlice.reducer;
