import React from 'react';
import { Link } from 'react-router-dom';
import { MdBackspace, MdSave } from 'react-icons/md';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Content from '~/components/Content';
import Title from '~/components/Title';

export default function CreateStudent() {
  return (
    <Container>
      <Title>
        <h1>Cadastrar aluno</h1>

        <div>
          <Link to="/students/create">
            <Button icon={MdBackspace} type="button" text="VOLTAR" />
          </Link>
          <Button icon={MdSave} type="button" text="CADASTRAR" />
        </div>
      </Title>
      <Content>asdasdasd</Content>
    </Container>
  );
}
