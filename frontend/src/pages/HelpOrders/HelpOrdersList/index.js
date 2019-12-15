import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import { MdSend } from 'react-icons/md';

import Shimmer from 'react-shimmer-effect';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import TextInput from '~/components/TextInput';
import EmptyContainer from '~/components/EmptyContainer';
import LoadingLine from '~/components/LoadingLine';
import {
  Table,
  TableFooter,
  TableFooterButton,
  ActionButton,
} from '~/components/Table';
import ConfirmAlert from '~/components/ConfirmAlert';
import Button from '~/components/Button';

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
    async function answerHelpOrder(data, onCloseCallback) {
      try {
        await api.post(`help-orders/${helpOrder.id}/answer`, {
          answer: data.answer,
        });

        toast.success('Pedido de ajuda respondido com sucesso');

        setHelpOrders(helpOrders.filter(item => item.id !== helpOrder.id));

        onCloseCallback();
      } catch (_) {
        toast.error('Não foi possível responder à este pedido de ajuda.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          onClose={onClose}
          showButtons={false}
          onlyConfirmButton
          title={`PERGUNTA DE ${helpOrder.student.name.toUpperCase()}`}
          message={
            <>
              <p>{helpOrder.question}</p>

              <Form onSubmit={data => answerHelpOrder(data, onClose)}>
                <TextInput
                  name="answer"
                  label="SUA RESPOSTA"
                  placeholder="Escreva sua resposta aqui"
                />

                <Button type="submit" text="RESPONDER" icon={MdSend} />
              </Form>
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
            {loading ? (
              <tr>
                <td>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </td>
              </tr>
            ) : (
              helpOrders.map(helpOrder => (
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
              ))
            )}

            {!helpOrders.length && !loading && (
              <tr>
                <td colSpan="2">
                  <EmptyContainer>
                    <strong>
                      Não há pedidos de ajuda para serem exibidos.
                    </strong>
                  </EmptyContainer>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Content>

      <TableFooter>
        <TableFooterButton
          type="button"
          disabled={page === 1}
          onClick={() => decrementPage()}
        >
          Anterior
        </TableFooterButton>
        <span>Página {page}</span>
        <TableFooterButton
          type="button"
          disabled={page === Number(pageAmount) || Number(pageAmount) === 0}
          onClick={() => incrementPage()}
        >
          Próximo
        </TableFooterButton>
      </TableFooter>
    </Container>
  );
}
