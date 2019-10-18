import Sequelize, { Model } from 'sequelize';
import { formatDistanceStrict } from 'date-fns';
import pt from 'date-fns/locale/pt';

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
            return formatDistanceStrict(this.birth, new Date(), {
              locale: pt,
            });
          },
        },
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
      },
      { sequelize }
    );

    return this;
  }
}

export default Student;
