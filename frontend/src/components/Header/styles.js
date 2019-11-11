import styled from 'styled-components';

import colors from '~/styles/colors';

export const Container = styled.div`
  height: 64px;
  background: ${colors.secondary};
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-right: 20px;
      height: 32px;
      border-right: 1px solid ${colors.grey};
    }
  }
  a {
    font-weight: bold;
    color: ${colors.white};
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
      color: ${colors.white};
    }
    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: ${colors.grey};
    }
  }
  img {
    border: 2px solid ${colors.primary};
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;
