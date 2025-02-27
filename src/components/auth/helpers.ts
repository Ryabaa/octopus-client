import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@utils/localStorage";

const AUTH_ACTIONS = {
    REMOVE: "REMOVE",
    SET: "SET",
    GET: "GET",
} as const;

type AuthAction = (typeof AUTH_ACTIONS)[keyof typeof AUTH_ACTIONS];

export const handleLocalAuthData = (
    action: AuthAction,
    accessToken?: string,
    refreshToken?: string,
    userId?: string,
    isAuthorized?: string
) => {
    const localAuthData = [
        { key: "accessToken", value: accessToken },
        { key: "refreshToken", value: refreshToken },
        { key: "userId", value: userId! },
        { key: "isAuthorized", value: isAuthorized },
    ];

    switch (action) {
        case AUTH_ACTIONS.SET:
            localAuthData.forEach(({ key, value }) => setLocalStorage(key, value!));
            break;
        case AUTH_ACTIONS.REMOVE:
            localAuthData.forEach(({ key }) => removeLocalStorage(key));
            break;
        case AUTH_ACTIONS.GET:
            return localAuthData.reduce((acc, { key }) => {
                acc[key] = getLocalStorage(key);
                return acc;
            }, {} as Record<string, string | null>);
        default:
            throw new Error("Invalid action");
    }
};
