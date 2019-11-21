import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ContainerWrapper({ children }) {
  return <Container>{children}</Container>;
}

ContainerWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};
