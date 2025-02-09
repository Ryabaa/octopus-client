import styled from "styled-components";

export const NavbarWrapper = styled.nav`
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    background: #141414;
    width: 96%;
    height: 70px;
    z-index: 10;
    color: #b7b7b9;
    border-radius: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 100px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    a {
        color: #b7b7b9;
        &.active {
            color: #00aa6b;
        }
    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const CartIcon = styled.div<{ isTranslated: boolean }>`
    position: absolute;
    width: 64px;
    height: 55px;
    border-radius: 45px;
    background-color: ${({ isTranslated }) => (isTranslated ? "#333333" : "#00aa6b")};
    left: 50%;
    top: ${({ isTranslated }) => (isTranslated ? "47%" : "0")};
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    box-shadow: ${({ isTranslated }) => (isTranslated ? "unset" : "0 6px #00aa6c3f")};
    a {
        color: #fff !important;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`;

export const CartBorder = styled.div`
    position: absolute;
    left: 50%;
    top: 0px;
    transform: translate(-50%, 0);
    height: 35px;
    width: 74px;
    border-radius: 0 0 45px 45px;
    background: #000;
    z-index: 15;
`;

export const CartCounter = styled.p`
    position: absolute;
    top: -5px;
    right: 0;
    background: #fff;
    color: #777777;
    border-radius: 15px;
    padding: 0 5px;
    text-align: center;
    font-weight: 500;
`;
