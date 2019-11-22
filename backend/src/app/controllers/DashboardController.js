import { Op } from 'sequelize';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import HelpOrder from '../models/HelpOrder';

class DashboardController {
  async index(req, res) {
    const students = Student.count();

    const plans = Plan.count();

    const enrollments = Enrollment.count({
      where: { end_date: { [Op.gte]: new Date() } },
    });

    const helpOrders = HelpOrder.count({
      where: { answer_at: null },
    });

    return res.json({
      students,
      plans,
      enrollments,
      helpOrders,
    });
  }
}

export default new DashboardController();
