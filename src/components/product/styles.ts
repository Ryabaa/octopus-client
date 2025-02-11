import styled from "styled-components";

export const ItemWrapper = styled.div`
    width: 500px;
    height: 100vh;
    overflow-y: auto;
    margin-top: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 500px) {
        width: 100vw;
    }
`;

export const ItemInfo = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-content: center;
    column-gap: 40px;
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
    align-items: flex-start;
    flex-direction: column;
    row-gap: 10px;
    padding: 30px 0;
    img {
        width: 100px;
        height: 100px;
        border-radius: 30px;
    }
    svg {
        color: #b7b7b9;
    }
    p {
        color: #b7b7b9;
    }
    h2 {
        color: #b7b7b9;
        font-size: 15px;
        font-weight: 700;
        width: 150px;
    }
    h3 {
        color: #b7b7b9;
        font-weight: 500;
        font-size: 14px;
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
    background: #333333;
    background: linear-gradient(180deg, #333333ff 0%, #000000ff 100%);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
`;

export const ItemCatalog = styled.div<{ isOutOfStock: boolean }>`
    display: grid;
    padding: ${({ isOutOfStock }) => (isOutOfStock ? "50px 5px 300px" : "25px 5px 50px")};
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    row-gap: 20px;
    column-gap: 5px;
    width: 320px;
`;

export const StyledItemCard = styled.div<{ isOutOfStock: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 110px;
    background: #141414;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.11);
    border-radius: 15px;
    color: #b7b7b9;
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
    bottom: 0;
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
    background-color: #222222;
    color: #b7b7b9;
    button {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: unset;
        width: 100%;
        height: 100%;
        border-radius: 0 0 15px 0 !important;
        &:first-child {
            border-radius: 0 0 0 15px !important;
        }
        &:active {
            background: #a0a0a057;
        }
    }
    svg {
        color: #b7b7b9;
    }
    input {
        width: 35px;
        height: 35px;
        text-align: center;
        z-index: 3;
        position: absolute;
        left: 50%;
        background: unset;
        color: #b7b7b9;
        transform: translate(-50%, 0);
        font-size: 15px;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;

export const ActionMenu = styled.div<{ isActive: boolean; isExpanded: boolean | undefined }>`
    display: grid;
    margin-top: 15px;
    position: relative;
    grid-template-columns: ${({ isExpanded }) => (isExpanded ? "1fr" : "repeat(2, 1fr)")};
    align-items: center;
    justify-items: center;
    background: #333;
    border-radius: ${({ isActive }) => (isActive ? "15px 15px 15px 0" : "15px")};
    width: 320px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.26);
    margin-bottom: 30px;
    z-index: 2;
    button {
        width: 100%;
        font-size: 15px;
        background: unset;
        height: 50px;
        color: #b7b7b9;
        border-radius: 0 15px 15px 0;
        span {
            color: #00aa6b;
        }
        &:active {
            background: #a0a0a057;
        }
        &:first-child {
            ${({ isExpanded, isActive }) =>
                !isExpanded &&
                `
      border-radius: ${isActive ? "15px 0 0 0" : "15px 0 0 15px"};
      border-right: 1px solid #4b4b4b;
      `}
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
    opacity: ${({ isActive }) => (isActive ? "1" : "0")};
    button {
        border: 0 !important;
        height: 35px;
        visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
        height: ${({ isActive }) => (isActive ? "35px" : "0")} !important;
    }
    div {
        transition: all 0.2s ease;
        visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
        height: ${({ isActive }) => (isActive ? "35px" : "0")} !important;
    }
`;
