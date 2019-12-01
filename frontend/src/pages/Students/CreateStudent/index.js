import React from 'react';
import { Link } from 'react-router-dom';

import { MdArrowBack, MdSave } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Title from '~/components/Title';
import TextInput from '~/components/TextInput';
import DatePickerInput from '~/components/DatePickerInput';

import { Content } from './styles';

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
    birth: Yup.date().required('Data de nascimento é obrigatório'),
    weigth: Yup.number().required('A altura é obrigatório'),
    height: Yup.number().required('O peso é obrigatório'),
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
          <TextInput
            name="email"
            label="ENDEREÇO DE E-MAIL"
            placeholder="exemplo@email.com"
          />
          <DatePickerInput name="birth" label="DATA DE NASCIMENTO" />
          <TextInput name="weigth" label="PESO (em kg)" />
          <TextInput name="height" label="ALTURA (em m)" />
        </Content>
      </Container>
    </Form>
  );
}
