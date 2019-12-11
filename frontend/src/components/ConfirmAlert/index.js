import React from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdClose } from 'react-icons/md';

import { Card } from './styles';

import colors from '~/styles/colors';

import Button from '~/components/Button';

export default function ConfirmAlert({ callback, onClose, title, message }) {
  return (
    <Card>
      <h1>{title}</h1>
      {typeof message === 'object' ? message : <p>{message}</p>}
      <div>
        <Button
          type="button"
          onClick={onClose}
          icon={MdClose}
          text="NÃO"
          color={colors.darkGrey}
        />

        <Button
          type="button"
          text="SIM"
          icon={MdCheck}
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
  message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

ConfirmAlert.defaultProps = {
  title: 'Você está certo disso?',
  message: 'Você deseja confirmar esta ação?',
};
