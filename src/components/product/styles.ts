import styled from "styled-components";

export const ItemWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    margin-top: 75px;
    background-color: #e3e3e3;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ItemInfo = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-content: center;
    column-gap: 20px;
`;

export const Favorite = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 10px;
    p {
        font-size: 14px !important;
        margin: 0 !important;
    }
`;

export const ItemInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    row-gap: 10px;
    padding: 30px 0;
    img {
        width: 100px;
        height: 100px;
        border-radius: 30px;
    }
    svg {
        color: #787878;
    }
    p {
        text-align: center;
        color: #787878;
    }
    h2 {
        color: #787878;
        font-size: 15px;
        font-weight: 700;
    }
    h3 {
        color: #787878;
        font-weight: 500;
        font-size: 14px;
        width: 120px;
        span {
            font-size: 14px;
            color: #00aa6b;
        }
    }
`;

export const Line = styled.div<{ width: string; color: string }>`
    width: ${({ width }) => width};
    background-color: ${({ color }) => color};
    height: 3px;
    border-radius: 20px;
`;

export const ItemPrice = styled.div`
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    p {
        font-size: 13px;
        letter-spacing: 1.2px;
        margin: 0;
    }
`;

export const ItemCatalogWrapper = styled.div`
    width: 100%;
    flex: 1;
    border-radius: 70px 70px 0 0;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
`;

export const ItemCatalog = styled.div<{ isOutOfStock: boolean }>`
    justify-items: center;
    display: grid;
    padding: ${({ isOutOfStock }) => (isOutOfStock ? "50px 20px 200px" : "25px 20px 50px")};
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    row-gap: 20px;
    column-gap: 5px;
    width: 100%;
`;

export const StyledItemCard = styled.div<{ isOutOfStock: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 110px;
    background-color: #fff;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.11);
    border-radius: 15px;
    color: #787878;
    position: relative;
    opacity: ${({ isOutOfStock }) => (isOutOfStock ? 0.5 : 1)};
    h3 {
        margin-top: 10px;
        font-size: 15px;
        height: 35px;
        font-weight: 400;
        line-height: 1;
        width: 100%;
        text-align: center;
    }
    span {
        color: #00aa6b;
    }
`;

export const ItemSide = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    button {
        height: 100%;
        width: 100%;
        background: unset;
        transition: unset;
        &.left {
            border-radius: 15px 0 0 15px;
        }
        &.right {
            border-radius: 0 15px 15px 0;
        }
        &:active {
            background: #a0a0a057;
        }
    }
`;

export const ItemCounter = styled.div`
    display: grid;
    position: relative;
    width: 100%;
    height: 35px;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    border-radius: 0 0 15px 15px;
    background-color: #0000003a;
    color: #787878;
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: unset;
    }
    svg {
        color: #fff;
    }
    input {
        width: 35px;
        height: 35px;
        text-align: center;
        z-index: 3;
        position: absolute;
        left: 50%;
        background: unset;
        color: #fff;
        transform: translate(-50%, 0);
        font-size: 15px;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;

export const ActionMenu = styled.div<{ isActive: boolean }>`
    display: grid;
    margin-top: 15px;
    position: relative;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    background: #fff;
    transition: all 0.6s ease;
    border-radius: ${({ isActive }) => (isActive ? "15px 15px 15px 0" : "15px")};
    width: 85%;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.11);
    margin-bottom: 30px;
    z-index: 2;
    button {
        width: 100%;
        font-size: 15px;
        background: unset;
        height: 50px;
        color: #787878;
        border-radius: 0 15px 15px 0;
        &:first-child {
            border-radius: 15px 0 0 15px;
            border-right: 1px solid #e3e3e3;
        }
        &:active {
            background: #a0a0a057;
        }
    }
`;

export const ActionMenuCounter = styled.div<{ isActive: boolean }>`
    position: absolute;
    width: 50%;
    left: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 0 0 15px 15px;
    transform: translate(0, 100%);
    visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
    button {
        border: 0 !important;
        height: 35px;
    }
    div {
        transition: all 0.2s ease;
        height: ${({ isActive }) => (isActive ? "35px" : "0")} !important;
    }
`;
