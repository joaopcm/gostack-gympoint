import styled from 'styled-components';

import ContentWrapper from '~/components/Content';

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

export const Content = styled(ContentWrapper)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 20px;

  div:nth-child(1),
  div:nth-child(2) {
    grid-column: 1 / 4;
  }
`;
