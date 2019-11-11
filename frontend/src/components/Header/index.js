import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">MEU PERFIL</Link>
            </div>
            <img
              src={
                profile.avatar
                  ? profile.avatar.url
                  : `https://api.adorable.io/avatars/285/${profile.email}.png`
              }
              alt={`Foto de perfil de ${profile.name}`}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
