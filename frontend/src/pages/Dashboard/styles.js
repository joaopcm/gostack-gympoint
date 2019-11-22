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
      font-size: 46px;
      color: ${colors.white};
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

export const LoadingCircle = styled.div`
  height: 46px;
  width: 46px;
  border-radius: 50%;
`;

export const LoadingLine = styled.div`
  width: 50%;
  height: 16px;
  align-self: center;
  border-radius: 8px;
`;

export const LoadingContainer = styled.div`
  border-radius: 4px;
  background-color: ${colors.white};
  display: flex;
  padding: 20px;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
