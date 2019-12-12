import Sequelize, { Model } from 'sequelize';
import { differenceInCalendarDays } from 'date-fns';

import Enrollment from './Enrollment';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        birth: Sequelize.DATE,
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.calculateAge();
          },
        },
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
      },
      { sequelize }
    );

    async function isActive(students) {
      if (Array.isArray(students)) {
        Promise.all(
          students.map(student => {
            const enrollment = Enrollment.findOne({
              where: { student_id: student.id || students.getDataValue('id') },
            });

            if (enrollment) {
              student.setDataValue('active', true);
            } else {
              student.setDataValue('active', false);
            }

            return student;
          })
        );
      } else if (students) {
        const enrollment = await Enrollment.findOne({
          where: { student_id: students.id },
        });

        if (enrollment) {
          students.setDataValue('active', true);
        } else {
          students.setDataValue('active', false);
        }
      }

      return students;
    }

    this.addHook('afterFind', isActive);

    return this;
  }

  calculateAge() {
    const age = Math.floor(
      differenceInCalendarDays(new Date(), this.birth) / 365.25
    );
    return `${age} anos`;
  }
}

export default Student;
