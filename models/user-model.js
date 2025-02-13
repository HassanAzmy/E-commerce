const Sequelize = require("sequelize");

const sequelize = require('../utility/database');

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

module.exports = User;