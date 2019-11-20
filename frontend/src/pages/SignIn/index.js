import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo-vertical.svg';

import { Card } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Card>
      <img src={logo} alt="GymPoint" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="exemplo@email.com"
          label="SEU E-MAIL"
        />
        <Input
          name="password"
          id="password"
          type="password"
          placeholder="•••••••••••"
          label="SUA SENHA"
        />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </Card>
  );
}