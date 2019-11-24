import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './styles';

export default function Button({ type, icon, text }) {
  return (
    /* eslint-disable react/button-has-type */
    <ButtonWrapper type={type}>
      <div>{icon()}</div>
      <span>{text}</span>
    </ButtonWrapper>
    /* eslint-enable react/button-has-type */
  );
}

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button',
};
