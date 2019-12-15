import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

import colors from './colors';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: ${colors.secondary};
  }

  body, input, button, textarea {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6, th {
    color: ${colors.dark};
  }

  p, span {
    color: ${colors.darkGrey};
  }
`;
