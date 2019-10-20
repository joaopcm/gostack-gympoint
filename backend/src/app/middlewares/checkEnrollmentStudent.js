import * as Yup from 'yup';

import Student from '../models/Student';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    student_id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { student_id } = req.body;

  const student = await Student.findByPk(student_id);

  if (!student) {
    return res.status(400).json({ error: 'Student does not exist' });
  }

  return next();
};
