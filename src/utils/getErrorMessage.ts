import { notifyError } from "./toastNotifications";

export default (error: any) => {
    if (error.message === "Network Error") {
        notifyError(error.message);
    }
    const errorMessage = error.response.data.message;
    if (errorMessage instanceof Array) {
        notifyError(
            errorMessage.map((string: string) => string.charAt(0).toUpperCase() + string.slice(1)).join("\n")
        );
    } else {
        notifyError(errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
    }
};
