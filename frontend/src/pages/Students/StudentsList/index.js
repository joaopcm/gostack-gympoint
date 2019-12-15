import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Shimmer from 'react-shimmer-effect';
import { Form } from '@rocketseat/unform';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import ConfirmAlert from '~/components/ConfirmAlert';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';
import Container from '~/components/Container';
import Content from '~/components/Content';
import Title from '~/components/Title';
import {
  Table,
  TableFooter,
  TableFooterButton,
  ActionButton,
} from '~/components/Table';
import LoadingLine from '~/components/LoadingLine';
import EmptyContainer from '~/components/EmptyContainer';

import api from '~/services/api';

export default function StudentsList() {
  const [loading, setLoading] = useState(false);
  const [pageAmount, setPageAmount] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);

        const response = await api.get('students', {
          params: {
            page,
            q: search,
          },
        });

        setStudents(response.data);
        setPageAmount(response.headers.total_pages);
      } catch (error) {
        toast.error('Não foi possível carregar os alunos.');
      }

      setLoading(false);
    }

    loadStudents();
  }, [page, search]);

  useEffect(() => {
    document.title = 'GymPoint - Alunos';
  }, []);

  function incrementPage() {
    setPage(page + 1);
  }

  function decrementPage() {
    setPage(page - 1);
  }

  function handleSearchSubmit(data) {
    setPage(1);
    setSearch(data.search);
  }

  async function handleDeleteStudent(student) {
    async function deleteStudent() {
      try {
        await api.delete(`/students/${student.id}`);

        toast.success('Aluno deletado com sucesso.');

        setStudents(
          students.filter(currentStudent => currentStudent.id !== student.id)
        );
      } catch (error) {
        toast.error('Não foi possível excluir este aluno.');
      }
    }

    confirmAlert({
      customUI: ({ onClose }) => ( // eslint-disable-line
        <ConfirmAlert
          callback={deleteStudent}
          onClose={onClose}
          title="Deseja excluir este aluno?"
          message={
            <p>
              Se confirmar, o aluno <strong>{student.name}</strong> será
              deletado. Isso é irreversível. Deseja mesmo excluí-lo?
            </p>
          }
        />
      ),
    });
  }

  return (
    <Container>
      <Title>
        <h1>Lista de alunos</h1>

        <div>
          <Link to="/students/create">
            <Button icon={MdAdd} type="button" text="CADASTRAR" />
          </Link>
          <Form onSubmit={handleSearchSubmit}>
            <TextInput
              type="text"
              name="search"
              placeholder="Pesquisar por alunos"
            />
          </Form>
        </div>
      </Title>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
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
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <Link to={`/students/${student.id}`}>
                      <ActionButton color="info">editar</ActionButton>
                    </Link>
                    <ActionButton
                      color="danger"
                      onClick={() => handleDeleteStudent(student)}
                    >
                      excluir
                    </ActionButton>
                  </td>
                </tr>
              ))
            )}
            {!students.length && !loading && (
              <tr>
                <td colSpan="3">
                  <EmptyContainer>
                    <strong>Não há alunos para serem exibidos.</strong>
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
