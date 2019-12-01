import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { formatDistanceStrict, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import 'react-confirm-alert/src/react-confirm-alert.css';

import Shimmer from 'react-shimmer-effect';

import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import Button from '~/components/Button';
import ConfirmAlert from '~/components/ConfirmAlert';
import EmptyContainer from '~/components/EmptyContainer';
import LoadingLine from '~/components/LoadingLine';
import {
  Table,
  TableFooter,
  ActionButton,
  TableFooterButton,
} from '~/components/Table';

import api from '~/services/api';

import { formatPrice } from '~/util/format';

export default function PlansList() {
  const [plans, setPlans] = useState([]);

  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadPlans() {
      try {
        setLoading(true);

        const response = await api.get('plans', {
          params: { page },
        });

        const data = response.data.map(plan => ({
          ...plan,
          priceFormatted: formatPrice(plan.price),
          durationFormatted: formatDistanceStrict(
            addMonths(new Date(), plan.duration),
            new Date(),
            { locale: pt }
          ),
        }));

        setPlans(data);
        setPageAmount(response.headers.total_pages);
      } catch (error) {
        toast.error('Não foi possível carregar planos');
      }

      setLoading(false);
    }

    loadPlans();
  }, [page]);

  async function handleDeletePlan(plan) {
    async function deleteStudent() {
      try {
        await api.delete(`/plans/${plan.id}`);

        toast.success('Plano excluído com sucesso.');

        setPlans(plans.filter(currentPlan => currentPlan.id !== plan.id));
      } catch (error) {
        toast.error('Não foi possível excluir este plano.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          callback={deleteStudent}
          onClose={onClose}
          title="Deseja excluir este plano?"
          message={
            <p>
              Se confirmar, o plano <strong>{plan.title}</strong> será deletado.
              Isso é irreversível. Deseja mesmo excluí-lo?
            </p>
          }
        />
      ),
    });
  }

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    setPage(page - 1);
  }

  return (
    <Container>
      <Title>
        <h1>Lista de planos</h1>

        <div>
          <Link to="/plans/create">
            <Button type="button" icon={MdAdd} text="CADASTRAR" />
          </Link>
        </div>
      </Title>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR P/MÊS</th>
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
                <td>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </td>
                <td>
                  <Shimmer>
                    <LoadingLine />
                  </Shimmer>
                </td>
              </tr>
            ) : (
              plans.map(plan => (
                <tr key={plan.id}>
                  <td>{plan.title}</td>
                  <td>{plan.durationFormatted}</td>
                  <td>{plan.priceFormatted}</td>
                  <td>
                    <Link to={`/plans/${plan.id}`}>
                      <ActionButton color="info">editar</ActionButton>
                    </Link>
                    <ActionButton
                      color="danger"
                      onClick={() => handleDeletePlan(plan)}
                    >
                      excluir
                    </ActionButton>
                  </td>
                </tr>
              ))
            )}
            {!plans.length && !loading && (
              <tr>
                <td colSpan="3">
                  <EmptyContainer>
                    <strong>Não há planos para serem exibidos.</strong>
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
          disabled={page === Number(pageAmount)}
          onClick={() => incrementPage()}
        >
          Próximo
        </TableFooterButton>
      </TableFooter>
    </Container>
  );
}
