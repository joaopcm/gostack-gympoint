import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo-horizontal.svg';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

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
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
