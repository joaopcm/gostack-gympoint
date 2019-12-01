import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';

import { MdArrowBack, MdSave } from 'react-icons/md';

import CurrencyInput from '~/components/CurrencyInput';
import Container from '~/components/Container';
import Title from '~/components/Title';
import Button from '~/components/Button';
import TextInput from '~/components/TextInput';

import { Content } from './styles';

import colors from '~/styles/colors';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string()
    .max(255, 'Título pode ter no máximo 255 caracteres')
    .required('Título é obrigatório'),
  duration: Yup.number()
    .min(1, 'Duração inválida')
    .typeError('Duração é obrigatório')
    .required('Duração é obrigatório'),
  price: Yup.number()
    .typeError('Preço é obrigatório')
    .required('Preço é obrigatório'),
});

export default function CreatePlan({ match }) {
  const { id } = match.params;

  const [initialData, setInitialData] = useState();
  const [loading, setLoading] = useState(false);
  const [computedPrice, setComputedPrice] = useState(0);
  const [computedDuration, setComputedDuration] = useState(1);

  const totalPrice = useMemo(() => {
    return computedPrice * computedDuration;
  }, [computedPrice, computedDuration]);

  useEffect(() => {
    async function loadPlan() {
      try {
        setLoading(true);
        const response = await api.get(`plans/${id}`);
        setInitialData(response.data);
      } catch (error) {
        toast.error('Erro ao carregar dados do plano');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPlan();
    }
  }, [id]);

  async function handleSubmit(data) {
    if (id) {
      try {
        const { title, duration, price } = data;

        await api.put(`plans/${id}`, { title, duration, price });

        toast.success('Plano editado com sucesso.');

        history.push('/plans');
      } catch (error) {
        toast.error('Não foi possível cadastrar o plano.');
      }
    } else {
      try {
        const { title, duration, price } = data;

        await api.post('plans', { title, duration, price });

        toast.success('Plano cadastrado com sucesso.');

        history.push('/plans');
      } catch (error) {
        toast.error('Não foi possível cadastrar o plano.');
      }
    }
  }

  return (
    <Form initialData={initialData} onSubmit={handleSubmit} schema={schema}>
      <Container>
        <Title>
          <h1>{id ? 'Editar plano' : 'Cadastrar plano'}</h1>

          <div>
            <Link to="/plans">
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
          <TextInput disabled={loading ? 1 : 0} name="title" label="TÍTULO" />
          <TextInput
            disabled={loading ? 1 : 0}
            name="duration"
            value={computedDuration}
            onChange={e => setComputedDuration(e.target.value)}
            type="number"
            label="DURAÇÃO (em meses)"
          />
          <CurrencyInput
            name="price"
            value={computedPrice}
            onChange={(masked, raw) => setComputedPrice(raw)}
            label="PREÇO TOTAL"
          />
          <CurrencyInput
            disabled
            name="totalPrice"
            label="PREÇO TOTAL"
            value={totalPrice}
          />
        </Content>
      </Container>
    </Form>
  );
}

CreatePlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

CreatePlan.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
