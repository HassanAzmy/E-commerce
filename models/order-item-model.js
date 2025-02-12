const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const OrderItem = sequelize.define('orderItem', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;