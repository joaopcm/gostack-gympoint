import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

class EnrollmentController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const enrollments = await Enrollment.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    // Check if this student already has an enrollment
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      return res
        .status(401)
        .json({ error: 'A enrollment with this student already exists' });
    }

    // Calculate the full price and end date
    const plan = await Plan.findByPk(plan_id);

    const price = plan.duration * plan.price;
    const end_date = addMonths(parseISO(start_date), plan.duration);

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const enrollment = await Enrollment.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    // Check if admin can edit student_id
    if (student_id !== enrollment.student_id) {
      const studentEnrollmentExists = await Enrollment.findOne({
        where: { student_id },
      });

      if (studentEnrollmentExists) {
        return res
          .status(401)
          .json({ error: 'A enrollment with this student already exists' });
      }
    }

    let { price, end_date } = enrollment;

    // Calculate the full price and end date
    if (plan_id !== enrollment.plan_id) {
      price = plan.duration * plan.price;
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    // Calculate the new end date
    if (start_date !== enrollment.start_date) {
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
    await enrollment.save();

    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Enrollment.destroy({ where: { id } });

    return res.send();
  }
}

export default new EnrollmentController();
