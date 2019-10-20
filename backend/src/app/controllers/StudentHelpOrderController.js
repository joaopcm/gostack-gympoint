import * as Yup from 'yup';
import { isAfter } from 'date-fns';

import HelpOrder from '../models/HelpOrder';
import Enrollment from '../models/Enrollment';

class StudentHelpOrderController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const { id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: id },
      limit: quantity,
      offset: (page - 1) * quantity,
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { question } = req.body;

    // Check if the student is able to enter gym
    const isStudentAble = await Enrollment.findOne({
      where: { student_id: id },
    });

    if (!isStudentAble || !isAfter(isStudentAble.end_date, new Date())) {
      return res
        .status(401)
        .json({ error: 'Your enrollment is not able to send help orders' });
    }

    const helpOrder = await HelpOrder.create({ student_id: id, question });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrderController();
