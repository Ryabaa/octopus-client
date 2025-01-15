import styled, { css, keyframes } from "styled-components";

const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0) scale(1.5) rotate(-15deg);
  }
  20% {
    transform: translateX(-15px) translateY(10px) scale(1.5) rotate(15deg);
  }
  30%{
    transform: rotate(-15deg) scale(1.4);
  }
  50% {
    transform: rotate(15deg) scale(1.2);
  }
  70%{
      transform: scale(1.1);
  }
  `;

export const NavbarWrapper = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 66px;
    z-index: 10;
`;

export const NavLogo = styled.img<{ isAnimating: boolean }>`
    user-select: none;
    position: absolute;
    right: 0;
    width: 65px;
    opacity: 0.9;
    cursor: pointer;
    ${(props) =>
        props.isAnimating &&
        css`
            animation: ${shakeAnimation} 1s ease;
        `}
`;

export const MenuContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: min-content;
    position: absolute;
    top: 6px;
    left: 6px;
    height: 60px;
    border-radius: 10px 50px 50px 0px;
    border: 1px solid #a3a3a3;
    background-color: #f0f7f0e0;
`;

export const MenuButton = styled.button<{ isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: ${({ isActive }) => (isActive ? "85px" : "50px")};
    color: ${({ isActive }) => (isActive ? "#DCFF32" : "unset")};
    background: ${({ isActive }) => (isActive ? "#000" : "unset")};
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    &:first-child {
        border-radius: 5px 0 0 0;
        padding-right: 5px;
    }
    &:last-child {
        border-radius: 0 50px 50px 0;
        padding-right: 5px;
    }
    img {
        width: 25px;
        color: ${({ isActive }) => (isActive ? "#DCFF32" : "unset")};
    }
    .label {
        color: #fff;
        white-space: nowrap;
    }
`;

export const Search = styled.div<{ isOpen: boolean }>`
    position: absolute;
    top: 66px;
    left: 6px;
    min-width: 51px;
    max-width: 235px;
    height: 50px;
    transition: all 0.2s ease;
    button {
        border-radius: 0 0 30px 5px;
        position: absolute;
        border-left: 1px solid #a3a3a3;
        border-right: 1px solid #a3a3a3;
        border-bottom: 1px solid #a3a3a3;
        background-color: ${({ isOpen }) => (isOpen ? "#000" : "#f0f7f0e0")};
        width: 51px;
        height: 50px;
        z-index: 3;
    }
    svg {
        color: ${({ isOpen }) => (isOpen ? "#dcff32" : "#000")};
        transform: rotate(90deg);
        position: absolute;
        top: 11px;
        left: 11px;
    }
    input {
        z-index: 2;
        background-color: #f0f7f0e0;
        visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
        width: ${({ isOpen }) => (isOpen ? "235px" : "0px")};
        transition: all 0.3s ease;
        height: 100%;
        border-radius: 0 0 10px 5px;
        padding-left: 65px;
        color: #000;
        font-size: 14px;
        border-bottom: ${({ isOpen }) => (isOpen ? "1px solid #a3a3a3" : "unset")};
        border-right: ${({ isOpen }) => (isOpen ? "1px solid #a3a3a3" : "unset")};
    }
`;
