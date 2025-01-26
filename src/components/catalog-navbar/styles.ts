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
    padding: 0 10px;
    height: 75px;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e3e3e3;
`;

export const NavLogo = styled.div<{ isAnimating: boolean; isVisible: boolean }>`
    user-select: none;
    cursor: pointer;
    height: 37px;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
    ${(props) =>
        props.isAnimating &&
        css`
            animation: ${shakeAnimation} 1s ease;
        `}
    svg {
        width: 37px;
        fill: #00aa6b;
    }
`;

export const MenuContainer = styled.div<{ isExpanded: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: min-content;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 28px;
    visibility: ${({ isExpanded }) => (isExpanded ? "visible" : "hidden")};
    height: 50px;
    width: ${({ isExpanded }) => (isExpanded ? "min-content" : "0px")};
    border-radius: 2px 20px 20px 2px;
    background: #727272;
    padding-left: 10px;
    transition: all 0.2s ease-in-out;
    margin-left: ${({ isExpanded }) => (isExpanded ? "0px" : "400px")};
    opacity: ${({ isExpanded }) => (isExpanded ? "1" : "0")};
`;

export const MenuButton = styled.button<{ isActive?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: unset;
    width: 45px;
    transition: all 0.2s ease-in-out;
    svg {
        width: 26px;
        fill: ${({ isActive }) => (isActive ? "#00aa6b" : "#fff")};
    }
    .all-asort {
        fill: ${({ isActive }) => (isActive ? "#00aa6b" : "none")};
        stroke: ${({ isActive }) => (isActive ? "none" : "#fff")};
    }
`;

export const MenuToggler = styled.div<{ isVisible: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
    cursor: pointer;
    background: ${({ isVisible }) => (isVisible ? "unset" : "#00aa6b")};
    border-radius: 2px;
    width: ${({ isVisible }) => (isVisible ? "unset" : "7px")};
    height: ${({ isVisible }) => (isVisible ? "unset" : "50px")};
    svg {
        color: ${({ isVisible }) => (isVisible ? "#787878" : "unset")};
        visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
        width: 32px;
        height: 32px;
    }
`;

export const Search = styled.div<{ isVisible: boolean }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    visibility: ${({ isVisible }) => (isVisible ? "visible" : "hidden")};
    opacity: ${({ isVisible }) => (isVisible ? "1" : "0")};
    margin-left: ${({ isVisible }) => (isVisible ? "0px" : "400px")};
    transition: all 0.2s ease-in-out;
    svg {
        color: #787878;
        transform: rotate(90deg);
        position: absolute;
        left: 15px;
    }
    input {
        background: #e3e3e3;
        width: 200px;
        transition: all 0.3s ease;
        height: 100%;
        border-radius: 15px;
        padding: 0 20px 0 50px;
        color: #787878;
        font-size: 14px;
    }
`;

export const IndicatorContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    bottom: -2px;
    background: #fff;
    height: 5px;
    left: 50%;
    padding: 0 10px;
    transform: translate(-50%, 0);
`;

export const IndicatorDot = styled.div<{ isActive: boolean }>`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    transform: ${({ isActive }) => (isActive ? "scale(1.5)" : "unset")};
    background-color: ${({ isActive }) => (isActive ? "#00aa6b" : "#b0b0b0")};
    transition: background-color 0.3s ease;
`;
