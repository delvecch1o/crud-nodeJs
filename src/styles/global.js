import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin : 0;
    padding: 0;
    box-sizing: border-box; 
    
}
body{
    widht: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    font-family: Poppins, sans-serif;
}
`

export default GlobalStyle;