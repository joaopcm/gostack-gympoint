import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import { TextInputWrapper } from './styles';

export default function TextInput({
  name,
  type,
  placeholder,
  label,
  className,
  ...rest
}) {
  return (
    <TextInputWrapper className={className}>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        label={label}
        {...rest}
      />
    </TextInputWrapper>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

TextInput.defaultProps = {
  label: null,
  className: '',
  type: 'text',
  placeholder: '',
};
