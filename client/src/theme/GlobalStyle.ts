import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    font-size: 18px;
    font-family: "Montserrat", sans-serif;

    *, *::before, *::after {
      box-sizing: border-box;
    }

    a:active, a:focus { outline: none; }

    b { font-weight: 600 } /* Bugzilla fix */

    input, textarea {outline:none;}
    input:active, textarea:active {outline:none;}
    :focus {outline:none;}
    textarea {resize:none;}
    textarea {resize:vertical;}
    textarea {resize:horizontal;}

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  }

  body{
    background-image: url('./images/bg.jpg');
  }

  html, body, #app, #app>div {
    height: 100%
  }

  h1 {
    padding-bottom: 5px;
  }

  p{
    font-weight: 300;
  }


  *[data-tip] {
    position: relative;
  }

  *[data-tip]:hover:after {
    visibility: visible;
    opacity: 1;
  }

  *[data-tip]:after {
    visibility: hidden;
    position: absolute;
    opacity: 0;
    transition: opacity 0s linear 1s;
    top: calc(100% + 5px);
    left: calc(100% + 5px);
    z-index: 2;
    content: attr(data-tip);
    display: inline-block;
    padding: 2px 6px;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    background-color: #fff;
    color: #161616;
    font-size: 11px;
    line-height: 11px;
  }
`
