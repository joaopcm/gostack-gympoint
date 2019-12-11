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
      if (students && students.length > 1) {
        Promise.all(
          students.map(student => {
            const enrollment = Enrollment.findOne({
              where: { student_id: student.id },
            });

            student.setDataValue('active', !!enrollment);

            return student;
          })
        );
      } else if (students) {
        const enrollment = await Enrollment.findOne({
          where: { student_id: students.id },
        });

        students.setDataValue('active', !!enrollment);
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
