import React from 'react';
import { Router } from 'react-router-dom';

import './config/reactotronConfig';

import Routes from './routes';
import history from './services/history';

import GlobalStyles from './styles/global';

export default function src() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyles />
    </Router>
  );
}
