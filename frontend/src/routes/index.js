import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';

import CreateEnrollment from '../pages/Enrollments/CreateEnrollment';
import EditEnrollment from '../pages/Enrollments/EditEnrollment';
import EnrollmentsList from '../pages/Enrollments/EnrollmentsList';

import AnswerHelpOrder from '../pages/HelpOrders/AnswerHelpOrder';
import HelpOrdersList from '../pages/HelpOrders/HelpOrdersList';

import CreatePlan from '../pages/Plans/CreatePlan';
import EditPlan from '../pages/Plans/EditPlan';
import PlansList from '../pages/Plans/PlansList';

import SignIn from '../pages/SignIn';

import CreateStudent from '../pages/Students/CreateStudent';
import EditStudent from '../pages/Students/EditStudent';
import StudentsList from '../pages/Students/StudentsList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/dashboard" component={Dashboard} isPrivate />

      <Route
        path="/enrollments/create"
        component={CreateEnrollment}
        isPrivate
      />
      <Route path="/enrollments/:id" component={EditEnrollment} isPrivate />
      <Route path="/enrollments" component={EnrollmentsList} isPrivate />

      <Route path="/help-orders/:id" component={AnswerHelpOrder} isPrivate />
      <Route path="/help-orders" component={HelpOrdersList} isPrivate />

      <Route path="/plans/create" component={CreatePlan} isPrivate />
      <Route path="/plans/:id" component={EditPlan} isPrivate />
      <Route path="/plans" component={PlansList} isPrivate />

      <Route path="/students/create" component={CreateStudent} isPrivate />
      <Route path="/students/:id" component={EditStudent} isPrivate />
      <Route path="/students" component={StudentsList} isPrivate />

      <Route path="" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}
