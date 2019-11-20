import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './services/history';

export default function src() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
