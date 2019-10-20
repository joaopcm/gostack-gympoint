import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

import authMiddleware from './app/middlewares/auth';
import checkStudentMiddleware from './app/middlewares/checkStudent';
import checkPlanMiddleware from './app/middlewares/checkPlan';
import checkEnrollmentMiddleware from './app/middlewares/checkEnrollment';
import checkEnrollmentPlanMiddleware from './app/middlewares/checkEnrollmentPlan';
import checkEnrollmentStudentMiddleware from './app/middlewares/checkEnrollmentStudent';
import checkHelpOrderMiddleware from './app/middlewares/checkHelpOrder';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get(
  '/students/:id/checkins',
  checkStudentMiddleware,
  CheckinController.index
);
routes.post(
  '/students/:id/checkins',
  checkStudentMiddleware,
  CheckinController.store
);

routes.get(
  '/students/:id/help-orders',
  checkStudentMiddleware,
  StudentHelpOrderController.index
);
routes.post(
  '/students/:id/help-orders',
  checkStudentMiddleware,
  StudentHelpOrderController.store
);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.get('/students/:id', checkStudentMiddleware, StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', checkStudentMiddleware, StudentController.update);
routes.delete(
  '/students/:id',
  checkStudentMiddleware,
  StudentController.delete
);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', checkPlanMiddleware, PlanController.update);
routes.delete('/plans/:id', checkPlanMiddleware, PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post(
  '/enrollments',
  checkEnrollmentPlanMiddleware,
  checkEnrollmentStudentMiddleware,
  EnrollmentController.store
);
routes.put(
  '/enrollments/:id',
  checkEnrollmentMiddleware,
  checkEnrollmentPlanMiddleware,
  checkEnrollmentStudentMiddleware,
  EnrollmentController.update
);
routes.delete(
  '/enrollments/:id',
  checkEnrollmentMiddleware,
  EnrollmentController.delete
);

routes.get('/help-orders', HelpOrderController.index);
routes.post(
  '/help-orders/:id/answer',
  checkHelpOrderMiddleware,
  HelpOrderController.store
);

export default routes;
