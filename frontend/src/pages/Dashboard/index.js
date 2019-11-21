import React from 'react';
import {
  MdPeople,
  MdStars,
  MdCreditCard,
  MdHelp,
  MdVerifiedUser,
} from 'react-icons/md';

import Container from '~/components/Container';
import { Title, Content, Card } from './styles';

import colors from '~/styles/colors';

export default function Dashboard() {
  return (
    <Container>
      <Title>Dashboard</Title>
      <Content>
        <Card>
          <div>
            <MdPeople size={46} color={colors.white} />
            <h1>Alunos</h1>
          </div>
          <div className="value">
            <h1>42</h1>
            <span>alunos ativos</span>
          </div>
        </Card>
        <Card>
          <div>
            <MdStars size={46} color={colors.white} />
            <h1>Planos</h1>
          </div>
          <div className="value">
            <h1>3</h1>
            <span>planos ativos</span>
          </div>
        </Card>
        <Card>
          <div>
            <MdCreditCard size={46} color={colors.white} />
            <h1>Matrículas</h1>
          </div>
          <div className="value">
            <h1>38</h1>
            <span>matrículas ativas</span>
          </div>
        </Card>
        <Card>
          <div>
            <MdHelp size={46} color={colors.white} />
            <h1>Pedidos</h1>
          </div>
          <div className="value">
            <h1>42</h1>
            <span>pedidos pendentes</span>
          </div>
        </Card>
        <Card>
          <div>
            <MdVerifiedUser size={46} color={colors.white} />
            <h1>Gerência</h1>
          </div>
          <div className="value">
            <h1>1</h1>
            <span>super usuários</span>
          </div>
        </Card>
      </Content>
    </Container>
  );
}
