import React, { useEffect } from 'react';

// import { Container } from './styles';

export default function HelpOrdersList() {
  useEffect(() => {
    document.title = 'GymPoint - Pedidos de ajuda';
  }, []);

  return <h1>Help Orders List</h1>;
}
