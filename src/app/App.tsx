import { FC, useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import GlobalStyles from "@styles/globalStyles";

import AuthHandler from "@components/auth/authHandler";
import Auth from "@components/auth/Auth";
import Login from "@components/auth/Login";
import Register from "@components/auth/Register";
import AppNavbar from "@components/app-navbar/AppNavbar";
import CatalogNavbar from "@components/catalog-navbar/CatalogNavbar";
import Catalog from "@components/catalog/Catalog";
import Product from "@components/product/Product";
import Cart from "@components/cart/Cart";
import Favorites from "@components/favorites/Favorites";

import toastConfig from "@utils/toastConfig";

import { useAppDispatch } from "@hooks/reduxHooks";

const App: FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
    }, [dispatch]);

    return (
        <>
            <GlobalStyles />
            <ToastContainer style={{ lineHeight: "1.5" }} {...toastConfig} />
            <BrowserRouter>
                <CatalogNavbar />
                <AppNavbar />
                <Routes>
                    <Route path="*" element={<Navigate to="/catalog/all" replace />} />

                    <Route path="/catalog/:category" element={<Catalog />} />
                    <Route path="/catalog/item/:id" element={<Product />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/cart/item/:id" element={<Product isFromCart />} />

                    <Route path="/auth/*" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="/auth-success" element={<AuthHandler />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
