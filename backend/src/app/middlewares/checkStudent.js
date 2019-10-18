import * as Yup from 'yup';

import Student from '../models/Student';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
  });

  if (!(await schema.isValid(req.param))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { id } = req.params;

  const student = await Student.findByPk(id);

  if (!student) {
    return res.status(400).json({ error: 'Student does not exist' });
  }

  return next();
};
