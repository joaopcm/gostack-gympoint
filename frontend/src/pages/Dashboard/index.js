import React, { useState, useEffect } from 'react';
import { MdPeople, MdStars, MdCreditCard, MdHelp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';

import api from '~/services/api';

import Container from '~/components/Container';
import {
  Title,
  Content,
  Card,
  LoadingContainer,
  LoadingCircle,
  LoadingLine,
} from './styles';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    students: 0,
    plans: 0,
    enrollments: 0,
    helpOrders: 0,
  });
  const [cards] = useState([
    {
      name: 'Students',
      alias: 'Alunos',
      description: 'alunos ativos',
      icon: MdPeople,
      value: 'students',
      to: '/students',
    },
    {
      name: 'Plans',
      alias: 'Planos',
      description: 'planos ativos',
      icon: MdStars,
      value: 'plans',
      to: '/plans',
    },
    {
      name: 'Enrollments',
      alias: 'Matrículas',
      description: 'matrículas ativas',
      icon: MdCreditCard,
      value: 'enrollments',
      to: '/enrollments',
    },
    {
      name: 'HelpOrders',
      alias: 'Pedidos',
      description: 'pedidos pendentes',
      icon: MdHelp,
      value: 'helpOrders',
      to: '/help-orders',
    },
  ]);

  useEffect(() => {
    async function loadValues() {
      try {
        setLoading(true);

        const response = await api.get('dashboard');

        const { students, plans, enrollments, helpOrders } = response.data;

        setValues({ students, plans, enrollments, helpOrders });
      } catch (error) {
        toast.error('Não foi possível carregar as informações do dashboard.');
      }

      setLoading(false);
    }

    loadValues();
  }, []);

  return (
    <Container>
      <Title>Dashboard</Title>
      <Content>
        {cards.map(card =>
          loading ? (
            <LoadingContainer key={card.name}>
              <Shimmer>
                <LoadingCircle />
              </Shimmer>
              <Shimmer>
                <LoadingLine />
              </Shimmer>
            </LoadingContainer>
          ) : (
            <Link key={card.name} to={card.to}>
              <Card>
                <div>
                  {card.icon()}
                  <h1>{card.alias}</h1>
                </div>
                <div className="value">
                  <h1>{values[card.value]}</h1>
                  <span>{card.description}</span>
                </div>
              </Card>
            </Link>
          )
        )}
      </Content>
    </Container>
  );
}
