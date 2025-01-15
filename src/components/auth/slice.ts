import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType, AUTH, AuthFormType, AuthAccessTokenType } from "./types";
import { setLocalStorage } from "@utils/localStorage";

const authInitialState: AuthStateType = {
    isLoading: false,
    isAuthorized: false,
};

export const authSlice = createSlice({
    name: AUTH,
    initialState: authInitialState,
    reducers: {
        logout: (state: AuthStateType) => {
            state.isAuthorized = false;
        },
        registerUserAction: (state: AuthStateType, {}: PayloadAction<AuthFormType>) => {
            state.isLoading = true;
        },
        loginUserAction: (state: AuthStateType, {}: PayloadAction<AuthFormType>) => {
            state.isLoading = true;
        },
        authUserSuccessAction: (state: AuthStateType, { payload }: PayloadAction<AuthAccessTokenType>) => {
            const { accessToken, refreshToken } = payload;
            state.isAuthorized = true;
            setLocalStorage("refreshToken", refreshToken);
            setLocalStorage("accessToken", accessToken);
            state.isLoading = false;
        },
        authErrorAction: (state: AuthStateType) => {
            state.isLoading = false;
        },
    },
});

export const { logout, registerUserAction, loginUserAction, authUserSuccessAction, authErrorAction } =
    authSlice.actions;

export default authSlice.reducer;
