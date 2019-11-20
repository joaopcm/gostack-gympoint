import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/reactotronConfig';

import Routes from './routes';
import history from './services/history';

import store from './store';

import GlobalStyles from './styles/global';

export default function src() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyles />
      </Router>
    </Provider>
  );
}
