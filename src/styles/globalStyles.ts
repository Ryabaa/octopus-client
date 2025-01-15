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
    color: #4e4e4e;
  }

  input, textarea{
    color: #4e4e4e;
    border-radius: 3px;
  }

  body, html {
    display: flex;
    justify-content: center;
    background-size: cover;
    background: #f0f7f0;
    width: 100%;
    height: 100%;
  }

::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    background: unset;

}

::-webkit-scrollbar-thumb {
    background-color: #545454;
    border-radius: 10px;
    transition: all 0.3s ease;
    &:hover {
        background-color: #aaaaaa;
    }
}

::-webkit-scrollbar-button {
    display: none;
}

`;

export default GlobalStyles;
