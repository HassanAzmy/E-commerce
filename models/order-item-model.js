import { Sequelize } from 'sequelize';
import sequelize from '../utility/database.js';

const OrderItem = sequelize.define('orderItem', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

export default OrderItem;