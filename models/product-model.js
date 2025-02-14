import mongoConnect from '../utility/database'

export default class Product {
   constructor(title, price, desciption, imageUrl) {
      this.title = title;
      this.price = price;
      this.desciption = desciption;
      this.imageUrl = imageUrl;
   }

   save() {

   }
}

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

// export default Product;