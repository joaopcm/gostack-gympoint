import React from 'react';
import PropTypes from 'prop-types';
import { Input, Textarea } from '@rocketseat/unform';

import { TextInputWrapper } from './styles';

export default function TextInput({
  name,
  type,
  placeholder,
  label,
  className,
  isTextArea,
  ...rest
}) {
  return (
    <TextInputWrapper className={className}>
      {!isTextArea ? (
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          label={label}
          {...rest}
        />
      ) : (
        <Textarea
          name={name}
          multiline
          rows="5"
          type={type}
          placeholder={placeholder}
          label={label}
          {...rest}
        />
      )}
    </TextInputWrapper>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  isTextArea: PropTypes.bool,
};

TextInput.defaultProps = {
  label: null,
  className: '',
  type: 'text',
  placeholder: '',
  isTextArea: false,
};
