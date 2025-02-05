import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

export const CatalogContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 60px;
`;

export const ProductList = styled.div`
    display: grid;
    min-width: 350px;
    padding: 50px 10px;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
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
    background-color: #e3e3e3;
    img {
        width: 55px;
        border-radius: 22px;
    }
    svg {
        color: #b9b9b9;
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
        color: #787878;
    }
    span {
        color: #787878;
        font-weight: 400;
    }
`;

export const ProductItem = styled.div`
    width: 160px;
    height: 240px;
    padding-top: 25px;
    padding-bottom: 10px;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.11);
    text-align: center;
    color: #787878;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    h3 {
        font-weight: 600;
        color: #787878;
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
