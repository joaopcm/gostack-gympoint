import React from 'react';
import { Link } from 'react-router-dom';

import { MdArrowBack, MdSave } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Content from '~/components/Content';
import Title from '~/components/Title';
import TextInput from '~/components/TextInput';

import colors from '~/styles/colors';

export default function CreateStudent() {
  const schema = Yup.object().shape({
    name: Yup.string()
      .max(255, 'O nome pode ter no máximo 255 caracteres')
      .required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .max(255, 'O e-mail pode ter no máximo 255 caracteres')
      .required('O e-mail é obrigatório'),
  });

  return (
    <Form schema={schema}>
      <Container>
        <Title>
          <h1>Cadastrar aluno</h1>

          <div>
            <Link to="/students/create">
              <Button
                icon={MdArrowBack}
                type="button"
                text="VOLTAR"
                color={colors.darkGrey}
              />
            </Link>
            <Button icon={MdSave} type="submit" text="CADASTRAR" />
          </div>
        </Title>
        <Content>
          <TextInput name="name" label="NOME COMPLETO" placeholder="John Doe" />
        </Content>
      </Container>
    </Form>
  );
}
