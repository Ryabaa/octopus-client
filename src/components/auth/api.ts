import api from "@app/api";

import { AuthFormType } from "./types";
import { requestUrl } from "@utils/requestUrl";

export const registerUserApi = async (formData: AuthFormType) => {
    const res = await api.post(requestUrl.register, formData);
    return res;
};

export const loginUserApi = async (formData: AuthFormType) => {
    const res = await api.post(requestUrl.login, formData);
    return res;
};
