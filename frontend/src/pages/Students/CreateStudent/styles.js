import styled from 'styled-components';

import colors from '~/styles/colors';

export const Content = styled.div`
  margin-top: 20px;
  padding: 30px;
  background: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    button {
      margin-right: 16px;
    }
  }
`;
