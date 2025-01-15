import axios from "axios";

import { store } from "./store";
import { logout } from "@components/auth/slice";

const API_URL = "http://localhost:3000";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let accessToken: string | null = localStorage.getItem("accessToken");
let refreshToken: string | null = localStorage.getItem("refreshToken");

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(`${API_URL}/auth/refresh`, {
                    refreshToken,
                });

                const newAccessToken = res.data.accessToken;
                const newRefreshToken = res.data.refreshToken;

                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                accessToken = newAccessToken;
                refreshToken = newRefreshToken;

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                store.dispatch(logout());
                window.location.href = "/auth";
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
