import styled from "styled-components";

export const PageName = styled.h2`
    position: absolute;
    left: 50%;
    top: 22px;
    transform: translate(-50%, 0);
    font-size: 15px;
    font-weight: 400;
    color: #787878;
    border: 1px solid #787878;
    border-radius: 15px;
    padding: 5px 20px;
`;

export const DeleteButton = styled.button`
    background: #787878;
    color: #fff;
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
    color: #787878;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, 0);
    h3 {
        font-size: 15px;
    }
`;
