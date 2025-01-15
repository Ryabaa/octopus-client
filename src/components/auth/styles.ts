import styled from "styled-components";

export const AuthWrapper = styled.div`
    width: 320px;
    padding: 20px 0;
    height: 780px;
    row-gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
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
    background: ${({ $isActive }) => ($isActive ? "#fff" : "#00000027")};
    color: ${({ $isActive }) => ($isActive ? "unset" : "#fff")};
    border-radius: 0 15px 15px 0;
    &:first-child {
        border-radius: 15px 0 0 15px;
    }
`;

export const Logo = styled.img`
    width: 120px;
    filter: invert(1);
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
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
            color: #fff;
        }
        p {
            visibility: ${({ isError }) => (isError ? "visible" : "hidden")};
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
    background-color: #00000027;
    color: #ffffff;
    &::placeholder {
        color: #ffffff;
    }
`;

export const Button = styled.button`
    height: 50px;
    width: 100%;
    background-color: #ffffff;
    border-radius: 30px;
    font-size: 14px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    height: 200px;
    row-gap: 10px;
    p {
        font-size: 14px;
    }
    a {
        height: 50px;
        width: 100%;
        background-color: #00000027;
        border-radius: 30px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        column-gap: 20px;
    }
`;
