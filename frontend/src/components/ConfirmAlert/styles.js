import styled, { css } from 'styled-components';

import colors from '~/styles/colors';

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;

  h1 {
    margin-bottom: 15px;
    font-size: 18px;
  }

  p {
    font-size: 18px;
    margin-bottom: 20px;

    strong {
      color: ${colors.dark};
    }
  }

  div {
    display: flex;
    justify-content: flex-end;
  }

  button {
    margin-top: 20px;

    ${props =>
      props.onlyConfirmButton &&
      css`
        width: 100%;
      `}
  }

  button + button {
    ${props =>
      !props.onlyConfirmButton &&
      css`
        margin-left: 10px;
      `}
  }
`;
