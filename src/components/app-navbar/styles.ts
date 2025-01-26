import styled from "styled-components";

export const NavbarWrapper = styled.nav`
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: #787878;
    width: 96%;
    height: 70px;
    z-index: 10;
    color: #fff;
    border-radius: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 100px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    a {
        color: #fff;
        &.active {
            color: #00aa6b;
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
    background-color: #00aa6b;
    //box-shadow: 0 0 4px #00aa6b;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    a {
        color: #fff;
        display: flex;
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
