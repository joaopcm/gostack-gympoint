import styled from 'styled-components';

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
  }

  input {
    margin-bottom: 20px;
  }
`;
