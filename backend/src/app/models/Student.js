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
      for (const student of students) {
        const enrollment = await Enrollment.findOne({
          where: { student_id: student.id },
        });

        student.setDataValue('active', !!enrollment);
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
