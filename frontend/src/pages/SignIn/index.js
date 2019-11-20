import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo-vertical.svg';

import { Card } from './styles';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <Card>
      <img src={logo} alt="GymPoint" />

      <Form onSubmit={handleSubmit}>
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
