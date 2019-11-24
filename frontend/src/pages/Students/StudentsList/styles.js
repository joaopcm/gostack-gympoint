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

export const Content = styled.div`
  margin-top: 20px;
  padding: 30px;
  background: ${colors.white};
  border-radius: 4px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;

  tr + tr {
    border-top: 1px solid ${colors.secondary};
  }

  td,
  th {
    padding: 16px 0;
  }
`;
