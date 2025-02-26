import { FC } from "react";
import { NavLink } from "react-router-dom";

import { NavbarWrapper, CartIcon, Container, CartCounter } from "./styles";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { PiPokerChip } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";

import { useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@app/store";

const AppNavbar: FC = () => {
    const { isCartOpened, cartCount } = useAppSelector((state: RootState) => state.cart);
    const isAuthOpened = useAppSelector((state: RootState) => state.auth.isOpened);

    return (
        !isAuthOpened && (
            <NavbarWrapper>
                <CartIcon isTranslated={isCartOpened}>
                    <NavLink to="/cart">
                        <MdOutlineShoppingCart size={20} />
                    </NavLink>
                    {!isCartOpened && cartCount > 0 && <CartCounter>{cartCount}</CartCounter>}
                </CartIcon>
                <Container>
                    <NavLink to="/catalog/all" className={({ isActive }) => (isActive ? "active" : "")}>
                        <AiFillHome size={20} />
                    </NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active" : "")}>
                        <FaRegHeart size={20} />
                    </NavLink>
                </Container>
                <Container>
                    <NavLink to="/roulette" className={({ isActive }) => (isActive ? "active" : "")}>
                        <PiPokerChip size={23} />
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                        <FaUser size={20} />
                    </NavLink>
                </Container>
            </NavbarWrapper>
        )
    );
};

export default AppNavbar;
