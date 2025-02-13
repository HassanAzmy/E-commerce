import { Sequelize } from 'sequelize';
import sequelize from '../utility/database.js';

const User = sequelize.define('user', {
   Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   name: Sequelize.STRING,
   email: Sequelize.STRING
});

export default User;