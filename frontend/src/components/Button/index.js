import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './styles';

import colors from '~/styles/colors';

export default function Button({ type, icon, text, color }) {
  return (
    /* eslint-disable react/button-has-type */
    <ButtonWrapper type={type} color={color}>
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
  color: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  color: colors.primary,
};
