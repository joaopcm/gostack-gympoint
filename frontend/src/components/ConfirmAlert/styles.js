import styled from 'styled-components';

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
  }

  p {
    font-size: 18px;
    margin-bottom: 50px;

    strong {
      color: ${colors.dark};
    }
  }

  div {
    display: flex;
    justify-content: flex-end;
  }

  button + button {
    margin-left: 10px;
  }
`;
