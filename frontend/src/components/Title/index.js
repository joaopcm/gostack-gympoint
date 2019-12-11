import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;

  div {
    display: flex;
    align-items: center;

    a + button {
      margin-left: 16px;
    }

    form {
      margin-left: 16px;
    }
  }
`;

export default Title;
