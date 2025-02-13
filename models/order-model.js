import { Sequelize } from 'sequelize';
import sequelize from '../utility/database.js';

const Order = sequelize.define('order', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
});

export default Order;