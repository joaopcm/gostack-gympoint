import styled from 'styled-components';

import colors from '~/styles/colors';

export const SelectInputWrapper = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    color: ${colors.dark};
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 8px;
  }

  & > div > div:nth-child(1),
  & > div > div:nth-child(2) {
    border: 2px solid ${colors.grey};
    border-radius: 4px;
    padding: 0 15px;
    color: ${colors.dark};
    width: 100%;
    height: 45px;

    &::placeholder {
      color: ${colors.grey};
      height: 19px;
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 19px;
    }
  }

  span {
    margin-top: 8px;
    color: ${colors.primary};
    align-self: flex-start;
    font-weight: bold;
  }
`;
