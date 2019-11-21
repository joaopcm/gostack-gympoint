import styled from 'styled-components';

import colors from '~/styles/colors';

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
`;

export const Card = styled.div`
  display: flex;
  background: ${colors.white};
  padding: 20px;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);

    span {
      color: ${colors.dark};
    }
  }

  div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      background: ${colors.primary};
      padding: 5px;
      border-radius: 50%;
      margin-right: 10px;
    }

    h1 {
      font-size: 16px;
      line-height: 18px;
      color: ${colors.primary};
    }
  }

  div.value {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      color: ${colors.primary};
    }
  }
`;
