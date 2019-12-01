import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';

import { MdArrowBack, MdSave } from 'react-icons/md';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Container from '~/components/Container';
import Button from '~/components/Button';
import Title from '~/components/Title';
import TextInput from '~/components/TextInput';
import DatePickerInput from '~/components/DatePickerInput';

import { Content } from './styles';

import colors from '~/styles/colors';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255, 'Nome pode ter no máximo 255 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .max(255, 'E-mail pode ter no máximo 255 caracteres')
    .required('E-mail é obrigatório'),
  birth: Yup.date().required('Data de nascimento é obrigatório'),
  weight: Yup.number()
    .typeError('Peso é obrigatório')
    .required('Peso é obrigatório'),
  height: Yup.number()
    .typeError('Altura é obrigatória')
    .required('Altura é obrigatória'),
});

export default function CreateStudent({ match }) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState();
  const { id } = match.params;

  useEffect(() => {
    async function loadStudent() {
      try {
        setLoading(true);

        const response = await api.get(`/students/${id}`);

        const { data } = response;

        setInitialData({
          ...data,
          birth: parseISO(data.birth),
        });
      } catch (error) {
        toast.error('Não foi possível carregar os dados do aluno.');
      }

      setLoading(false);
    }

    if (id) {
      loadStudent();
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      try {
        const { name, email, birth, weight, height } = data;

        await api.put(`students/${id}`, { name, email, birth, weight, height });

        toast.success('Usuário editado com sucesso.');

        history.push('/students');
      } catch (error) {
        toast.error('Não foi possível cadastrar o aluno.');
      }
    } else {
      try {
        const { name, email, birth, weight, height } = data;

        await api.post('students', { name, email, birth, weight, height });

        toast.success('Usuário cadastrado com sucesso.');

        history.push('/students');
      } catch (error) {
        toast.error('Não foi possível cadastrar o aluno.');
      }
    }
  }

  return (
    <Form initialData={initialData} schema={schema} onSubmit={handleSubmit}>
      <Container>
        <Title>
          <h1>{id ? 'Editar aluno' : 'Cadastrar aluno'}</h1>

          <div>
            <Link to="/students">
              <Button
                icon={MdArrowBack}
                type="button"
                text="VOLTAR"
                color={colors.darkGrey}
              />
            </Link>
            <Button
              icon={MdSave}
              disabled={loading ? 1 : 0}
              type="submit"
              text={id ? 'EDITAR' : 'CADASTRAR'}
            />
          </div>
        </Title>
        <Content>
          <TextInput
            disabled={loading ? 1 : 0}
            name="name"
            label="NOME COMPLETO"
            placeholder="John Doe"
          />
          <TextInput
            disabled={loading ? 1 : 0}
            name="email"
            label="ENDEREÇO DE E-MAIL"
            placeholder="exemplo@email.com"
          />
          <DatePickerInput
            name="birth"
            label="DATA DE NASCIMENTO"
            disabled={loading}
          />
          <TextInput
            disabled={loading ? 1 : 0}
            name="weight"
            type="number"
            label="PESO (em kg)"
          />
          <TextInput
            disabled={loading ? 1 : 0}
            name="height"
            type="number"
            label="ALTURA"
          />
        </Content>
      </Container>
    </Form>
  );
}

CreateStudent.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

CreateStudent.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
