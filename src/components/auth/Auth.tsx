import { FC, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

import { AuthWrapper, Tab, Tabs, Logo, AuthContainer } from "./styles";

import LogoIcon from "@assets/Logo2.svg?react";

const Auth: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isCurrentTabLogin: boolean = location.pathname.includes("login") ? true : false;

    const handleNavigateLogin = () => {
        navigate("/auth/login");
    };

    const handleNavigateRegister = () => {
        navigate("/auth/register");
    };

    const handleSwipe = useSwipeable({
        onSwipedLeft: () => {
            if (isCurrentTabLogin) {
                handleNavigateRegister();
            }
        },
        onSwipedRight: () => {
            if (!isCurrentTabLogin) {
                handleNavigateLogin();
            }
        },
    });

    useEffect(() => {
        if (location.pathname === "/auth" || location.pathname === "/auth/") {
            navigate("/auth/login");
        }
    }, [location, navigate]);

    return (
        <AuthWrapper {...handleSwipe}>
            <AuthContainer>
                <Tabs>
                    <Tab $isActive={isCurrentTabLogin} onClick={handleNavigateLogin}>
                        Войти
                    </Tab>
                    <Tab $isActive={!isCurrentTabLogin} onClick={handleNavigateRegister}>
                        Регистрация
                    </Tab>
                </Tabs>
                <Logo>
                    <LogoIcon />
                </Logo>
                <Outlet />
            </AuthContainer>
        </AuthWrapper>
    );
};

export default Auth;
