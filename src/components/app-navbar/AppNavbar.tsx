import { FC } from "react";
import { NavLink } from "react-router-dom";

import { NavbarWrapper, CartIcon, CartBorder, Container } from "./styles";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { PiPokerChip } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";
import { CiGrid41 } from "react-icons/ci";

const AppNavbar: FC = () => {
    return (
        <NavbarWrapper>
            <CartIcon>
                <NavLink to="/cart">
                    <MdOutlineShoppingCart size={18} />
                </NavLink>
            </CartIcon>
            <CartBorder />
            <Container>
                <NavLink to="/catalog" className={({ isActive }) => (isActive ? "active" : "")}>
                    <AiFillHome size={20} />
                </NavLink>
                <NavLink to="/roulette" className={({ isActive }) => (isActive ? "active" : "")}>
                    <PiPokerChip size={21} />
                </NavLink>
            </Container>
            <Container>
                <CiGrid41 size={22} />
                <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                    <FaUser size={20} />
                </NavLink>
            </Container>
        </NavbarWrapper>
    );
};

export default AppNavbar;
