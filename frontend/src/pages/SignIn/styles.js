import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const Card = styled.div`
  width: 100%;
  max-width: 360px;
  height: 448px;
  text-align: center;
  background: ${colors.white};
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 50px 30px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-weight: bold;
      color: ${colors.dark};
      font-size: 14px;
      line-height: 16px;
    }

    input {
      margin-top: 8px;
      margin-bottom: 20px;
      border: 2px solid ${colors.grey};
      border-radius: 4px;
      height: 45px;
      padding: 0 15px;
      color: ${colors.dark};
      width: 100%;

      &::placeholder {
        color: ${colors.grey};
        height: 19px;
        margin: 0 0 10px;
        font-size: 16px;
        line-height: 19px;
      }
    }

    span {
      margin-top: -18px;
      margin-bottom: 10px;
      color: ${colors.primary};
      align-self: flex-start;
      font-weight: bold;
    }

    button {
      padding: 13px 0;
      background: ${colors.primary};
      border: 0;
      color: ${colors.white};
      font-size: 16px;
      line-height: 19px;
      font-weight: bold;
      border-radius: 4px;

      &:hover {
        background: ${darken(0.03, colors.primary)};
      }
    }
  }
`;
