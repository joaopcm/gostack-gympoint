import { Op } from 'sequelize';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Enrollment from '../models/Enrollment';
import HelpOrder from '../models/HelpOrder';

class DashboardController {
  async index(req, res) {
    const students = await Student.count();

    const plans = await Plan.count();

    const enrollments = await Enrollment.count({
      where: { end_date: { [Op.gte]: new Date() } },
    });

    const helpOrders = await HelpOrder.count({
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
