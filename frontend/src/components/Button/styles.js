import styled from 'styled-components';
import { darken } from 'polished';

import colors from '~/styles/colors';

export const ButtonWrapper = styled.button`
  background: ${colors.primary};
  height: 45px;
  border: 0;
  color: ${colors.white};
  border-radius: 4px;
  display: flex;
  align-items: center;

  &:hover {
    background: ${darken(0.03, colors.primary)};
  }

  div {
    display: flex;
    align-items: center;
    padding: 12px;
    background: rgba(0, 0, 0, 0.1);

    svg {
      color: ${colors.white};
      font-size: 20px;
    }
  }

  span {
    color: ${colors.white};
    flex: 1;
    text-align: center;
    font-size: 16px;
    line-height: 19px;
    font-weight: bold;
    margin: 0 12px;
  }
`;
