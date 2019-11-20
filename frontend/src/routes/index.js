import React from 'react';
import { Switch, Route } from 'react-router-dom';

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

      <Route path="/enrollments/create" component={CreateEnrollment} />
      <Route path="/enrollments/:id" component={EditEnrollment} />
      <Route path="/enrollments" component={EnrollmentsList} />

      <Route path="/help-orders/:id" component={AnswerHelpOrder} />
      <Route path="/help-orders" component={HelpOrdersList} />

      <Route path="/plans/create" component={CreatePlan} />
      <Route path="/plans/:id" component={EditPlan} />
      <Route path="/plans" component={PlansList} />

      <Route path="/students/create" component={CreateStudent} />
      <Route path="/students/:id" component={EditStudent} />
      <Route path="/students" component={StudentsList} />

      <Route path="" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}
