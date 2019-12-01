import * as Yup from 'yup';

import Plan from '../models/Plan';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    plan_id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { plan_id } = req.body;

  const plan = await Plan.findByPk(plan_id);

  if (!plan) {
    return res.status(400).json({ error: 'Plan does not exist' });
  }

  return next();
};
