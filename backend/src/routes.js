import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';
import checkStudentMiddleware from './app/middlewares/checkStudent';
import checkPlanMiddleware from './app/middlewares/checkPlan';

const routes = new Router();

routes.post('/sessions', SessionController.store);

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

export default routes;
