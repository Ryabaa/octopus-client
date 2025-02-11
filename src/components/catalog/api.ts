import api from "@app/api";

import { requestUrl } from "@utils/requestUrl";

export const fetchProductsApi = async () => {
    const res = await api.get(requestUrl.allProducts);
    return res;
};
