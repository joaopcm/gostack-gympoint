import styled, { css } from 'styled-components';

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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;

  tr {
    color: #666;
    font-size: 16px;
    line-height: 20px;
  }

  tr + tr {
    border-top: 1px solid ${colors.secondary};
  }

  td,
  th {
    padding: 16px 0;
  }
`;

export const LoadingLine = styled.div`
  width: 50%;
  height: 16px;
  align-self: center;
  border-radius: 8px;
`;

export const TableFooter = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 10px;
  }
`;

export const TableFooterButton = styled.button`
  background: ${colors.white};
  border: 2px solid ${colors.grey};
  color: ${colors.darkGrey};
  padding: 10px 15px;
  border-radius: 4px;

  &:hover {
    ${props =>
      props.disabled &&
      css`
        cursor: not-allowed;
      `}
  }
`;

export const ActionButton = styled.button`
  color: ${props => colors[props.color]};
  background: transparent;
  border: 0;

  &:first-child {
    margin-right: 20px;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  strong {
    text-transform: uppercase;
  }
`;
