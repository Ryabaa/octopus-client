import api from "@app/api";

import { requestUrl } from "@utils/requestUrl";

export const updateCartApi = async (data: any) => {
    console.log(data);
    await api.put(requestUrl.cart, data);
};

export const fetchCartApi = async (userId: string) => {
    const res = await api.get(requestUrl.cart + userId);
    return res.data;
};
