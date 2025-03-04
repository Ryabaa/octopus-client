export const getLocalStorage = (name: string) => {
    return localStorage.getItem(name);
};

export const setLocalStorage = (name: string, value: string) => {
    return localStorage.setItem(name, value);
};

export const removeLocalStorage = (name: string) => {
    return localStorage.removeItem(name);
};
