export type AuthFormType = {
    username?: string | null;
    email: string | null;
    password: string | null;
};

export type AuthAccessTokenType = {
    accessToken: string;
    refreshToken: string;
};

export type AuthStateType = {
    isLoading: boolean;
    isAuthorized: boolean;
};

export const AUTH = "auth";
export type AUTH = typeof AUTH;
