const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Cart = sequelize.define('cart', {
   Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
});

module.exports = Cart;