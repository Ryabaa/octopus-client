import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "@components/loader/Loader";

import { useAppDispatch } from "@hooks/reduxHooks";

import { authUserSuccessAction } from "./slice";

const AuthHandler: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);

        const accessToken = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken");
        const userId = urlParams.get("userId");

        if (accessToken && refreshToken) {
            dispatch(authUserSuccessAction({ accessToken, refreshToken, userId }));
            window.history.replaceState({}, document.title, window.location.pathname);
            navigate("/");
            window.location.reload();
        } else {
            navigate("/auth");
        }
    }, []);

    return <Loader size={70} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />;
};

export default AuthHandler;
