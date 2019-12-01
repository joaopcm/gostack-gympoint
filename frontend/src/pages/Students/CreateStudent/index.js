import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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

import api from '~/services/api';
import history from '~/services/history';

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
    weight: Yup.number().required('A altura é obrigatório'),
    height: Yup.number().required('O peso é obrigatório'),
  });

  async function handleSubmit(data) {
    try {
      const { name, email, birth, weight, height } = data;

      await api.post('students', { name, email, birth, weight, height });

      toast.success('Usuário cadastrado com sucesso.');

      history.push('/students');
    } catch (error) {
      toast.error('Não foi possível cadastrar o aluno.');
    }
  }

  return (
    <Form schema={schema} onSubmit={handleSubmit}>
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
          <TextInput name="weight" label="PESO (em kg)" />
          <TextInput name="height" label="ALTURA" />
        </Content>
      </Container>
    </Form>
  );
}
