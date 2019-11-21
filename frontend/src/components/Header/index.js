import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo-horizontal.svg';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />

          <ul>
            <li>
              <NavLink to="/dashboard">DASHBOARD</NavLink>
            </li>
            <li>
              <NavLink to="/students">ALUNOS</NavLink>
            </li>
            <li>
              <NavLink to="/plans">PLANOS</NavLink>
            </li>
            <li>
              <NavLink to="/enrollments">MATRÍCULAS</NavLink>
            </li>
            <li>
              <NavLink to="/help-orders">PEDIDOS DE AUXÍLIO</NavLink>
            </li>
          </ul>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>João Melo</strong>
              <a href="/">Sair do sistema</a>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
