import React, { useEffect, useState } from 'react';
import { MdSave } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import TextInput from '~/components/TextInput';
import {
  Table,
  TableFooter,
  TableFooterButton,
  ActionButton,
} from '~/components/Table';
import ConfirmAlert from '~/components/ConfirmAlert';

import api from '~/services/api';

export default function HelpOrdersList() {
  const [helpOrders, setHelpOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageAmount, setPageAmount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadHelpOrders() {
      try {
        setLoading(true);

        const response = await api.get('/help-orders', { params: { page } });

        setHelpOrders(response.data);
        setPageAmount(response.headers.total_pages);
      } catch (error) {
        toast.error('Não foi possível carregar os pedidos de auxílio.');
      } finally {
        setLoading(false);
      }
    }

    loadHelpOrders();
  }, [page]);

  useEffect(() => {
    document.title = 'GymPoint - Pedidos de ajuda';
  }, []);

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    setPage(page - 1);
  }

  function handleAnswerHelpOrder(helpOrder) {
    async function answerHelpOrder() {
      try {
        await api.post(`help-orders/${helpOrder.id}/answer`, {
          answer: '',
        });
      } catch (_) {
        toast.error('Não foi possível responder à este pedido de ajuda.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          callback={answerHelpOrder}
          onClose={onClose}
          title={`PEDIDO DE AJUDA DE ${helpOrder.student.name}`}
          message={
            <>
              <p>{helpOrder.question}</p>
              <TextInput name="answer" />
            </>
          }
        />
      ),
    });
  }

  return (
    <Container>
      <Title>
        <h1>Lista de pedidos de ajuda</h1>
      </Title>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(helpOrder => (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>
                <td>
                  <ActionButton
                    color="info"
                    onClick={() => handleAnswerHelpOrder(helpOrder)}
                  >
                    responder
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
