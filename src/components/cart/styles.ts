import styled from "styled-components";

export const PageName = styled.h2`
    position: fixed;
    left: 50%;
    top: 22px;
    transform: translate(-50%, 0);
    font-size: 15px;
    font-weight: 400;
    color: #b7b7b9;
    border: 1px solid #b7b7b9;
    border-radius: 15px;
    padding: 5px 20px;
`;

export const DeleteButton = styled.button`
    background: #333;
    color: #b7b7b9;
    position: absolute;
    bottom: -30px;
    width: 100%;
    height: 40px;
    border-radius: 0 0 15px 15px;
`;

export const Empty = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
    align-items: center;
    color: #b7b7b9;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, 0);
    h3 {
        font-size: 15px;
    }
`;

export const PlacingButton = styled.button<{ isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    background: ${({ isActive }) => (isActive ? "#00aa6b" : "#333")};
    width: 96%;
    height: 60px;
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 15px;
    h3 {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
    }
    p {
        color: #e7e7e7;
    }
`;
