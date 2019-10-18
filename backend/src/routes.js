import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';
import checkStudentMiddleware from './app/middlewares/checkStudent';

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

export default routes;
