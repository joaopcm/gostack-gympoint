import styled, { css } from 'styled-components';

import colors from '~/styles/colors';

const Table = styled.table`
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

const TableFooter = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 10px;
  }
`;

const TableFooterButton = styled.button`
  background: ${props => (props.disabled ? colors.white : colors.primary)};
  color: ${props => (props.disabled ? colors.darkGrey : colors.white)};
  padding: 10px 15px;
  border-radius: 4px;
  border: 0;

  ${props =>
    props.disabled &&
    css`
      border: 2px solid ${colors.grey};
    `}

  &:hover {
    ${props =>
      props.disabled &&
      css`
        cursor: not-allowed;
      `}
  }
`;

const ActionButton = styled.button`
  color: ${props => colors[props.color]};
  background: transparent;
  border: 0;

  &:first-child {
    margin-right: 20px;
  }
`;

export { Table, TableFooter, TableFooterButton, ActionButton };
