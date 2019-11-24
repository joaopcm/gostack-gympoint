import styled from 'styled-components';

import colors from '~/styles/colors';

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

export const Content = styled.div``;

export const Table = styled.table`
  background: ${colors.white};
  border-radius: 4px;
`;
