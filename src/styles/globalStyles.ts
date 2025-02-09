import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

*, *::before, *::after {
    font-family: "Nunito", serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    font-size: 13px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    user-select: none;
    scroll-behavior: smooth;
    text-decoration: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    border: 0;
    padding: 0;
    margin: 0;
  }
  
  button, a {
    cursor: pointer;
    transition: all 0.3s ease;
    color: #b7b7b9;
  }

  input, textarea{
    color: #b7b7b9;
    border-radius: 3px;
  }

  body, html {
    display: flex;
    justify-content: center;
    background-size: cover;
    background: #333333;
    background: linear-gradient(180deg, #333333ff 0%, #000000ff 100%);
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    display: none;
}

::-webkit-scrollbar-thumb {
    display: none;
}

::-webkit-scrollbar-button {
    display: none;
}
`;

export default GlobalStyles;
