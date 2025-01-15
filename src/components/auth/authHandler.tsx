import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "@components/loader/Loader";

const AuthHandler: FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            window.history.replaceState({}, document.title, window.location.pathname);
            navigate("/");
        } else {
            navigate("/auth");
        }
    }, []);

    return <Loader size={70} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />;
};

export default AuthHandler;
