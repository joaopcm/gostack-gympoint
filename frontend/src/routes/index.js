import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '~/pages/Dashboard';
// import SignIn from '~/pages/SignIn';
// import SignUp from '~/pages/SignUp';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      {/* <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} /> */}
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="" component={() => <h1>404 - Route not found</h1>} />
    </Switch>
  );
}
