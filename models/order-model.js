const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const Order = sequelize.define('order', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

module.exports = Order;