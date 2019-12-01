import React from 'react';
import PropTypes from 'prop-types';

import { Card } from './styles';

import colors from '~/styles/colors';

import Button from '~/components/Button';

export default function ConfirmAlert({ callback, onClose, title, message }) {
  return (
    <Card>
      <h1>{title}</h1>
      {message}
      <div>
        <Button
          type="button"
          onClick={onClose}
          text="Não"
          color={colors.darkGrey}
        />

        <Button
          type="button"
          text="Sim"
          onClick={() => {
            callback();
            onClose();
          }}
        />
      </div>
    </Card>
  );
}

ConfirmAlert.propTypes = {
  callback: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.element,
};

ConfirmAlert.defaultProps = {
  title: 'Você está certo disso?',
  message: 'Você deseja confirmar esta ação?',
};
