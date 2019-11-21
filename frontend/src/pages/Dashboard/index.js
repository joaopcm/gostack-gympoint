import React from 'react';
import { MdPeople, MdStars, MdCreditCard, MdHelp } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Container from '~/components/Container';
import { Title, Content, Card } from './styles';

import colors from '~/styles/colors';

export default function Dashboard() {
  return (
    <Container>
      <Title>Dashboard</Title>
      <Content>
        <Link to="/students">
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
        </Link>
        <Link to="/plans">
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
        </Link>
        <Link to="/enrollments">
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
        </Link>
        <Link to="/help-orders">
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
        </Link>
      </Content>
    </Container>
  );
}
