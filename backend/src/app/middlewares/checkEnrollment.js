import * as Yup from 'yup';

import Enrollment from '../models/Enrollment';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.params))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { id } = req.params;

  const enrollment = await Enrollment.findByPk(id);

  if (!enrollment) {
    return res.status(400).json({ error: 'Enrollment does not exist' });
  }

  return next();
};
