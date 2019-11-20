import React from 'react';

import logo from '~/assets/logo-vertical.svg';

import { Card } from './styles';

export default function SignIn() {
  return (
    <Card>
      <img src={logo} alt="GymPoint" />

      <form>
        <label htmlFor="email">
          SEU E-MAIL
          <input id="email" type="email" placeholder="exemplo@email.com" />
        </label>
        <label htmlFor="password">
          SUA SENHA
          <input id="password" type="password" placeholder="•••••••••••" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </Card>
  );
}
