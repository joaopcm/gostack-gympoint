import styled from 'styled-components';
import { darken } from 'polished';

import background from '~/assets/background.png';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.dark} url(${background}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 2px solid rgb(37, 36, 44);
      border-radius: 4px;
      height: 50px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      transition: border 0.2s;
      &::placeholder {
        color: ${colors.grey};
      }
      &:focus {
        border: 2px solid ${colors.primary};
      }
    }
    span {
      color: ${colors.error};
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 50px;
      background: ${colors.primary};
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      &:hover {
        background: ${darken(0.03, colors.primary)};
      }
    }
    a {
      color: ${colors.primary};
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        color: ${darken(0.03, colors.primary)};
      }
    }
  }
`;
