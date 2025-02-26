import styled from "styled-components";

export const AuthWrapper = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    min-height: 100%;
    padding-top: 50px;
    background: #333333;
    background: linear-gradient(180deg, #333333ff 0%, #000000ff 100%);
`;

export const AuthContainer = styled.div`
    width: 320px;
    row-gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const Tabs = styled.div`
    display: grid;
    width: 80%;
    grid-template-columns: repeat(2, 1fr);
    cursor: pointer;
`;

type TabProps = {
    $isActive: boolean;
};

export const Tab = styled.div.attrs<TabProps>({})`
    padding: 10px;
    font-weight: 400;
    text-align: center;
    background: ${({ $isActive }) => ($isActive ? "#b7b7b9" : "#141414")};
    color: ${({ $isActive }) => ($isActive ? "unset" : "#b7b7b9")};
    border-radius: 0 15px 15px 0;
    &:first-child {
        border-radius: 15px 0 0 15px;
    }
`;

export const Logo = styled.div`
    svg {
        width: 80px;
        height: 80px;
        margin: 30px 0;
        fill: #b7b7b9;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: center;
    width: 85%;
`;

export const InputContainer = styled.div<{ isError?: boolean }>`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    div {
        position: relative;
        width: 100%;
        span {
            position: absolute;
            left: 20px;
            top: 15px;
            color: #b7b7b9;
        }
        p {
            visibility: ${({ isError }) => (isError ? "visible" : "hidden")};
            color: #b7b7b9;
            margin-top: 10px;
        }
    }
`;
export const Input = styled.input`
    height: 55px;
    font-size: 15px;
    width: 100%;
    border-radius: 30px;
    text-align: center;
    background-color: #141414;
    color: #b7b7b9;
    &::placeholder {
        color: #b7b7b9;
    }
`;

export const Button = styled.button`
    height: 50px;
    width: 100%;
    background-color: #b7b7b9;
    border-radius: 30px;
    font-size: 14px;
    color: #141414;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    height: 200px;
    row-gap: 10px;
    p {
        font-size: 14px;
    }
    a {
        height: 50px;
        width: 100%;
        background-color: #141414;
        color: #b7b7b9;
        border-radius: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
    }
`;
