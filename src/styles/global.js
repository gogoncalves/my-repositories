import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body, input, button {
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;        
    }

    body, html, #root {
        min-height: 100%;
    }

    body {
        background: #0D2636;
        -webkit-font-smoothing: antialiased !important;
    }

    button {
        cursor: pointer;
    }
`;
