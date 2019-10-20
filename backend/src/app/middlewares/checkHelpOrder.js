import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.params))) {
    return res.status(400).json({ error: 'Validation failed' });
  }

  const { id } = req.params;

  const helpOrder = await HelpOrder.findByPk(id);

  if (!helpOrder) {
    return res.status(400).json({ error: 'Help order does not exist' });
  }

  return next();
};
