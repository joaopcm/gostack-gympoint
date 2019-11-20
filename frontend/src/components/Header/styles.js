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

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid ${colors.grey};
    }

    a {
      font-weight: bold;
      color: ${colors.primary};
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid ${colors.grey};

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

    a {
      display: block;
      margin-top: 2px;
      font-size: 14px;
      line-height: 16px;
      color: ${colors.primary};
    }
  }
`;
