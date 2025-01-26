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
`;

export const Line = styled.div<{ width: number; color: string }>`
    width: ${({ width }) => `${width}px`};
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

export const ItemCatalog = styled.div`
    justify-items: center;
    display: grid;
    padding: 25px 20px 200px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    row-gap: 20px;
    column-gap: 5px;
    width: 100%;
`;

export const ItemCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 150px;
    height: 100px;
    background-color: #fff;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.11);
    border-radius: 15px;
    color: #787878;
    position: relative;
    h3 {
        margin-top: 10px;
        font-size: 15px;
        font-weight: 400;
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
    p {
        position: absolute;
        left: 50%;
        color: #fff;
        transform: translate(-50%, 0);
        font-size: 15px;
    }
`;

export const ActionMenu = styled.div`
    display: grid;
    margin-top: 15px;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    justify-items: center;
    background: #fff;
    border-radius: 15px;
    width: 85%;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.11);
    button {
        width: 100%;
        font-size: 15px;
        background: unset;
        height: 50px;
        color: #787878;
        &:first-child {
            border-right: 1px solid #e3e3e3;
        }
    }
`;
