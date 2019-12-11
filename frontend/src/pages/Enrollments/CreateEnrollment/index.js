import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@rocketseat/unform';
import { parseISO, addMonths, formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdSave, MdArrowBack } from 'react-icons/md';
import { formatPrice } from '~/util/format';

import colors from '~/styles/colors';

import Container from '~/components/Container';
import Title from '~/components/Title';
import Button from '~/components/Button';
import SelectInput from '~/components/SelectInput';
import DatePickerInput from '~/components/DatePickerInput';
import CurrencyInput from '~/components/CurrencyInput';

import { Content } from './styles';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .typeError('Aluno é obrigatório')
    .required('Aluno é obrigatório'),
  plan_id: Yup.number()
    .typeError('Plano é obrigatório')
    .required('Plano é obrigatório'),
  start_date: Yup.date().required('Data de início é obrigatório'),
});

export default function CreateEnrollment({ match }) {
  const { id } = match.params;

  const [initialData, setInitialData] = useState();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  const [selectedPlan, setSelectedPlan] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState();

  const endDate = useMemo(() => {
    return addMonths(selectedStartDate, selectedPlan.duration);
  }, [selectedPlan, selectedStartDate]);

  const totalPrice = useMemo(() => {
    return selectedPlan.total_price;
  }, [selectedPlan]);

  const loadStudents = useCallback(async inputValues => {
    try {
      setLoading(true);

      const response = await api.get('students', {
        params: {
          q: inputValues,
        },
      });

      const data = response.data
        .filter(student => !student.active)
        .map(student => ({
          id: student.id,
          title: student.name,
        }));

      setStudents(data);

      return data;
    } catch (_) {
      return toast.error('Erro ao carregar os alunos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPlans = useCallback(async inputValues => {
    try {
      setLoading(true);

      const response = await api.get('plans', {
        params: {
          q: inputValues,
        },
      });

      const data = response.data.map(plan => {
        const formattedTitle = `${plan.title} - ${formatPrice(
          plan.price
        )}/mês por ${formatDistanceStrict(
          addMonths(new Date(), plan.duration),
          new Date(),
          { locale: pt }
        )}`;

        return {
          id: plan.id,
          title: formattedTitle,
          total_price: plan.total_price,
          duration: plan.duration,
        };
      });

      setPlans(data);
      return data;
    } catch (_) {
      return toast.error('Erro ao carregar os planos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'GymPoint - Matrículas';
  }, []);

  useEffect(() => {
    async function loadEnrollment() {
      try {
        setLoading(true);

        const response = await api.get(`/enrollments/${id}`);

        const { data: enrollment } = response;

        const formattedTitle = `${enrollment.plan.title} - ${formatPrice(
          enrollment.plan.price
        )}/mês por ${formatDistanceStrict(
          addMonths(new Date(), enrollment.plan.duration),
          new Date(),
          { locale: pt }
        )}`;

        setPlans([...plans, { ...enrollment.plan, title: formattedTitle }]);

        setStudents([
          ...students,
          { id: enrollment.student.id, title: enrollment.student.name },
        ]);

        setSelectedPlan({
          id: enrollment.plan.id,
          title: enrollment.plan.title,
          duration: enrollment.plan.duration,
          total_price: enrollment.price,
        });

        setSelectedStartDate(parseISO(enrollment.start_date));

        if (!enrollment) throw new Error('Error to load enrollment data');

        setInitialData({
          start_date: parseISO(enrollment.start_date),
          student_id: enrollment.student.id,
          plan_id: enrollment.plan.id,
        });
      } catch (_) {
        toast.error('Erro ao carregar dados da matrícula.');

        history.push('/enrollments');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadEnrollment();
    }

    loadPlans();
  }, [id]); //eslint-disable-line

  async function handleSubmit(data) {
    if (id) {
      try {
        setLoading(true);

        const { student_id, plan_id, start_date } = data;

        await api.put(`enrollments/${id}`, { student_id, plan_id, start_date });

        toast.success('Matrícula editada com sucesso.');

        history.push('/enrollments');
      } catch (_) {
        toast.error('Não foi possível realizar a matrícula.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);

        const { student_id, plan_id, start_date } = data;

        await api.post('enrollments', { student_id, plan_id, start_date });

        toast.success('Matrícula cadastrado com sucesso.');

        history.push('/enrollments');
      } catch (_) {
        toast.error('Não foi possível cadastrar a matrícula.');
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} schema={schema} initialData={initialData}>
      <Container>
        <Title>
          <h1>{id ? 'Editar matrícula' : 'Cadastrar matrícula'}</h1>

          <div>
            <Link to="/enrollments">
              <Button
                type="button"
                color={colors.darkGrey}
                icon={MdArrowBack}
                text="VOLTAR"
              />
            </Link>
            <Button
              type="submit"
              disabled={loading}
              icon={MdSave}
              text={id ? 'EDITAR' : 'CADASTRAR'}
            />
          </div>
        </Title>

        <Content>
          <SelectInput
            name="student_id"
            isDisabled={loading}
            options={students}
            label="ALUNO"
            placeholder="Buscar aluno"
            noOptionsMessage={() => 'Não há alunos'}
            loadOptions={loadStudents}
            cacheOptions
          />
          <SelectInput
            noOptionsMessage={() => 'Não há planos'}
            isDisabled={loading}
            name="plan_id"
            options={plans}
            onChange={setSelectedPlan}
            loadOptions={loadPlans}
            label="PLANO"
            placeholder="Selecione o plano"
            cacheOptions
          />
          <DatePickerInput
            name="start_date"
            disabled={loading}
            label="DATA DE INÍCIO"
            onChange={setSelectedStartDate}
            placeholder="Escolha a data"
          />
          <DatePickerInput
            name="end_date"
            label="DATA DE TÉRMINO"
            value={endDate}
            disabled
          />
          <CurrencyInput
            name="totalPrice"
            label="VALOR FINAL"
            value={totalPrice}
            disabled
          />
        </Content>
      </Container>
    </Form>
  );
}

CreateEnrollment.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

CreateEnrollment.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
