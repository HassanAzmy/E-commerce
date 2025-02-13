import { Sequelize } from 'sequelize';
import sequelize from '../utility/database.js';

//* Defining the model and its attributes
const Product = sequelize.define('product', {
   Id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
   },
   title: Sequelize.STRING,
   price: {
      type: Sequelize.DOUBLE,
      allowNull: false
   },
   imageUrl: {
      type: Sequelize.STRING,
      allowNull: false
   },
   description: {
      type: Sequelize.STRING,
      allowNull: false
   }
}); 

export default Product;