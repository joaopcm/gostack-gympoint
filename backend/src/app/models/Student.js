import Sequelize, { Model } from 'sequelize';
import { differenceInCalendarDays } from 'date-fns';

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
