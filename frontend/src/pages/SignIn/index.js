import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';
import { MdSend } from 'react-icons/md';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-vertical.svg';

import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import { Card } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Card>
      <img src={logo} alt="GymPoint" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <TextInput
          name="email"
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          label="SEU E-MAIL"
        />
        <TextInput
          name="password"
          id="password"
          type="password"
          placeholder="•••••••••••"
          label="SUA SENHA"
        />

        <Button
          type="submit"
          icon={MdSend}
          text={loading ? 'Carregando...' : 'Entrar no sistema'}
        />
      </Form>
    </Card>
  );
}
