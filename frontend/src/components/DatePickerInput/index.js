import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { DatePicketInputWrapper } from './styles';

import 'react-datepicker/dist/react-datepicker.css';

setDefaultLocale(pt);

export default function DatePickerInput({ name, label }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <DatePicketInputWrapper>
      <label htmlFor={fieldName}>
        {label}
        <ReactDatePicker
          id={fieldName}
          name={fieldName}
          selected={selected}
          onChange={date => setSelected(date)}
          ref={ref}
        />
      </label>
      {error && <span>{error}</span>}
    </DatePicketInputWrapper>
  );
}

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

DatePickerInput.defautProps = {
  label: '',
};
