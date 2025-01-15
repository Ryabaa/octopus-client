import styled from "styled-components";

export const NavbarWrapper = styled.nav`
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #000;
    width: 100%;
    height: 70px;
    z-index: 10;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 100px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    a {
        color: #fff;
        &.active {
            color: #dcff32;
        }
    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const CartIcon = styled.div`
    position: absolute;
    width: 64px;
    height: 55px;
    border-radius: 45px;
    background-color: #dcff32;
    box-shadow: 0 0 8px #dcff32;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    a {
        color: #4e4e4e;
        display: flex;
        &.active {
            color: #4e4e4e;
        }
    }
`;

export const CartBorder = styled.div`
    position: absolute;
    left: 50%;
    top: -1px;
    transform: translate(-50%, 0);
    height: 35px;
    width: 74px;
    border-radius: 0 0 45px 45px;
    background: #f0f7f0;
    z-index: 15;
`;
