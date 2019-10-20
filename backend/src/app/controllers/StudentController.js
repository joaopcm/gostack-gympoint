import * as Yup from 'yup';
import { isAfter, parseISO } from 'date-fns';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.params;

    const students = await Student.findAll({
      limit: quantity,
      offset: (page - 1) * quantity,
    });

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      birth: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email, birth } = req.body;

    if (isAfter(parseISO(birth), new Date())) {
      return res
        .status(400)
        .json({ error: 'Birth date can not be after current date' });
    }

    const studentExists = await Student.findOne({ where: { email } });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      birth: Yup.date().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { name, email, birth, weight, height } = req.body;

    if (isAfter(parseISO(birth), new Date())) {
      return res
        .status(400)
        .json({ error: 'Birth date can not be after current date' });
    }

    const student = await Student.findByPk(id);

    if (student.email !== email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(401).json({ error: 'Email is already in use' });
      }
    }

    await student.update({ name, email, birth, weight, height });
    await student.save();

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Student.destroy({ where: { id } });

    return res.send();
  }
}

export default new StudentController();
