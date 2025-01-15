import { toast } from "react-toastify";

export const notifyError = (message: string) => {
    toast.error(message);
};

export const notifySuccess = (message: string) => {
    toast.success(message);
};

export const notifyInfo = (message: string) => {
    toast.info(message);
};
