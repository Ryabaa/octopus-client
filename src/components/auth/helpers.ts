import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@utils/localStorage";

type AuthAction = "REMOVE" | "SET" | "GET";

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
        case "SET":
            localAuthData.forEach(({ key, value }) => setLocalStorage(key, value!));
            break;
        case "REMOVE":
            localAuthData.forEach(({ key }) => removeLocalStorage(key));
            break;
        case "GET":
            return localAuthData.reduce((acc, { key }) => {
                acc[key] = getLocalStorage(key);
                return acc;
            }, {} as Record<string, string | null>);
        default:
            throw new Error("Invalid action");
    }
};
