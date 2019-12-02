import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { MdAdd } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
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

export default function EnrollmentsList() {
  const [enrollments, setEnrollments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageAmount, setPageAmount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadEnrollments() {
      try {
        setLoading(true);

        const response = await api.get('enrollments', {
          params: { page },
        });

        const data = response.data.map(enrollment => ({
          ...enrollment,
          start_date_formatted: format(
            parseISO(enrollment.start_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
          end_date_formatted: format(
            parseISO(enrollment.end_date),
            "dd 'de' MMMM 'de' yyyy",
            { locale: pt }
          ),
        }));

        setEnrollments(data);
        setPageAmount(response.headers.total_pages);
      } catch (error) {
        toast.error('Erro ao carregar matrículas');
      } finally {
        setLoading(false);
      }
    }

    loadEnrollments();
  }, [page]);

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    setPage(page - 1);
  }

  async function handleDeleteEnrollment(enrollment) {
    async function deleteEnrollment() {
      try {
        await api.delete(`/enrollments/${enrollment.id}`);

        toast.success('Matrícula excluída com sucesso.');

        setEnrollments(
          enrollments.filter(
            currentEnrollment => currentEnrollment.id !== enrollment.id
          )
        );
      } catch (error) {
        toast.error('Não foi possível excluir esta matrícula.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          callback={deleteEnrollment}
          onClose={onClose}
          title="Deseja excluir esta matrícula?"
          message={
            <p>
              Se confirmar, a matrícula do aluno{' '}
              <strong>{enrollment.student.name}</strong> será deletada. Isso é
              irreversível. Deseja mesmo excluí-la?
            </p>
          }
        />
      ),
    });
  }

  return (
    <Container>
      <Title>
        <h1>Lista de matrículas</h1>

        <div>
          <Link to="/enrollments/create">
            <Button icon={MdAdd} type="button" text="CADASTRAR" />
          </Link>
        </div>
      </Title>

      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
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
              enrollments.map(enrollment => (
                <tr key={enrollment.id}>
                  <td>{enrollment.student.name}</td>
                  <td>{enrollment.plan.title}</td>
                  <td>{enrollment.start_date_formatted}</td>
                  <td>{enrollment.end_date_formatted}</td>
                  <td>
                    <Link to={`/enrollments/${enrollment.id}`}>
                      <ActionButton color="info">editar</ActionButton>
                    </Link>
                    <ActionButton
                      color="danger"
                      onClick={() => handleDeleteEnrollment(enrollment)}
                    >
                      excluir
                    </ActionButton>
                  </td>
                </tr>
              ))
            )}
            {!enrollments.length && !loading && (
              <tr>
                <td colSpan="5">
                  <EmptyContainer>
                    <strong>Não há matrículas para serem exibidas.</strong>
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
