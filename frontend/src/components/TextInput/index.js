import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import { TextInputWrapper } from './styles';

export default function TextInput({ name, type, placeholder, label }) {
  return (
    <TextInputWrapper className="text-input-wrapper">
      <Input name={name} type={type} placeholder={placeholder} label={label} />
    </TextInputWrapper>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string,
};

TextInput.defaultProps = {
  label: null,
};
