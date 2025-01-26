import { FC } from "react";
import { NavLink } from "react-router-dom";

import { NavbarWrapper, CartIcon, CartBorder, Container } from "./styles";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { PiPokerChip } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";

const AppNavbar: FC = () => {
    return (
        <NavbarWrapper>
            <CartIcon>
                <NavLink to="/cart">
                    <MdOutlineShoppingCart size={20} />
                </NavLink>
            </CartIcon>
            <CartBorder />
            <Container>
                <NavLink to="/catalog" className={({ isActive }) => (isActive ? "active" : "")}>
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
    );
};

export default AppNavbar;
