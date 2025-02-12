const Sequelize = require('sequelize');

const sequelize = require('../utility/database');

const CartItem = sequelize.define('cart', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

module.exports = CartItem;