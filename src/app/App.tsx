import { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { store } from "./store";

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

import toastConfig from "@utils/toastConfig";

const App: FC = () => {
    return (
        <Provider store={store}>
            <GlobalStyles />
            <ToastContainer style={{ lineHeight: "1.5" }} {...toastConfig} />
            <BrowserRouter>
                <CatalogNavbar />
                <AppNavbar />
                <Routes>
                    <Route path="/catalog/:category" element={<Catalog />} />
                    <Route path="/catalog/item/:id" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />

                    <Route path="/auth/*" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="/auth-success" element={<AuthHandler />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
