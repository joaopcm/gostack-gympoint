import * as Yup from 'yup';

import Plan from '../models/Plan';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.param))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { id } = req.params;

  const plan = await Plan.findByPk(id);

  if (!plan) {
    return res.status(400).json({ error: 'Plan does not exist' });
  }

  return next();
};
