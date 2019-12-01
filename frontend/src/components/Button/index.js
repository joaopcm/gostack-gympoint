import React from 'react';
import PropTypes from 'prop-types';

import { ButtonWrapper } from './styles';

import colors from '~/styles/colors';

export default function Button({ type, icon, text, color, ...rest }) {
  return (
    /* eslint-disable react/button-has-type */
    <ButtonWrapper type={type} color={color} {...rest}>
      {icon && <div>{icon()}</div>}
      <span>{text}</span>
    </ButtonWrapper>
    /* eslint-enable react/button-has-type */
  );
}

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  color: colors.primary,
  icon: null,
};
