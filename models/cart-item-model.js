import { Sequelize } from 'sequelize';
import sequelize from '../utility/database.js';

const CartItem = sequelize.define('cartItem', {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

export default CartItem;