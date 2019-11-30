import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: ${colors.white};
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid ${colors.grey};
    }

    ul li {
      display: inline;

      & + li {
        margin-left: 20px;
      }
    }

    a {
      font-size: 15px;
      line-height: 19px;
      font-weight: bold;
      color: ${colors.darkGrey};
    }

    a.active {
      color: ${colors.dark};
    }
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      color: ${colors.dark};
    }

    button {
      background: transparent;
      border: 0;
      display: block;
      margin-top: 2px;
      font-size: 14px;
      line-height: 16px;
      color: ${colors.primary};
    }
  }
`;
