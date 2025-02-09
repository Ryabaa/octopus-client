import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

export const CatalogContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 80px 0 200px;
    overflow-y: auto;
`;

export const ProductList = styled.div`
    display: grid;
    width: 350px;
    padding: 50px 10px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
`;

export const Line = styled.h4`
    width: 80px;
    background-color: #cecece;
    height: 3px;
    border-radius: 20px;
    padding: 0;
`;

export const ItemHead = styled.div`
    display: flex;
    justify-content: center;
    column-gap: 20px;
    align-items: center;
    width: 100%;
    padding: 5px 0;
    background-color: #333333;
    img {
        width: 55px;
        border-radius: 22px;
    }
    svg {
        color: #b7b7b9;
    }
`;

export const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 5px;
    margin-bottom: 15px;
    h2 {
        color: #b7b7b9;
    }
    span {
        color: #b7b7b9;
        font-weight: 400;
    }
`;

export const ProductItem = styled.div`
    width: 160px;
    height: 240px;
    padding-top: 25px;
    padding-bottom: 10px;
    border-radius: 15px;
    background-color: #141414;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.11);
    text-align: center;
    color: #b7b7b9;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    h3 {
        font-weight: 600;
        color: #b7b7b9;
        height: 35px;
        width: 150px;
    }
`;

export const FadeTransition = styled(CSSTransition)`
    &.fade-enter {
        opacity: 0;
        transform: ${({ direction }) => (direction === "left" ? "translateX(100%)" : "translateX(-100%)")};
    }
    &.fade-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 400ms, transform 200ms;
    }
    &.fade-exit {
        opacity: 1;
        transform: translateX(0);
    }
    &.fade-exit-active {
        opacity: 0;
        transform: ${({ direction }) => (direction === "left" ? "translateX(-100%)" : "translateX(100%)")};
        transition: opacity 400ms, transform 200ms;
    }
`;
