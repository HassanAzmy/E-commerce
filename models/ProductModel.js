const Cart = require('./cartModel');
const db = require('../utility/database');

module.exports = class Product {
   constructor(title, imageUrl, price, description, Id = null) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.price = price;
      this.description = description;
      this.Id = Id;
   }

   save() {
      //* The (?, ?, ?, ?) for avoiding SQL injection
      // console.log(this);
      if(this.Id) {
         console.log('dsahuodhasiodas');         
         return db.execute(
            'UPDATE products SET title = ?, imageUrl = ?, price = ?, description = ? WHERE Id = ?',
            [this.title, this.imageUrl, this.price, this.description, this.Id]
         );
      }
      return db.execute(
         'INSERT INTO products (title, imageUrl, price, description) VALUES(?, ?, ?, ?)',
         [this.title, this.imageUrl, this.price, this.description]
      );
   }
   
   static fetchAll(callback) {
      return db.execute('SELECT * FROM products');         
   }

   static fetchProductById(Id) {
      return db.execute('SELECT * FROM products WHERE Id = ?', [Id]);
   }

   static deleteById(Id) {
      return db.execute('DELETE FROM products WHERE Id = ?', [Id]);
   }
}