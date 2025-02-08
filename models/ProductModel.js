const fs = require('fs');
const path = require('path');

const Cart = require('./cartModel');

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = callback => {
   fs.readFile(p, (err, fileContent) => {
      if (err)
         callback([]);
      else
         callback(JSON.parse(fileContent));
   });
}

module.exports = class Product {
   constructor(title, imageUrl, price, description, Id = null) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.price = price;
      this.description = description;
      this.Id = Id;
   }

   save() {
      getProductsFromFile(products => {
         if(this.Id) {
            const productIndex = products.findIndex(p => p.Id === this.Id);
            products[productIndex] = this;
         } else {
            this.Id = Math.random().toString();
            products.push(this);
         }
         fs.writeFile(p, JSON.stringify(products), err => {
            if(err)
               console.log(err);
         });
      });      
   }
   
   static fetchAll(callback) {
      getProductsFromFile(callback);      
   }

   static fetchProductById(Id, callback) {
      getProductsFromFile(products => {
         const product = products.find(p => p.Id === Id);
         callback(product);
      });
   }

   static deleteById(Id) {
      getProductsFromFile(products => {
         const productIndex = products.findIndex(p => p.Id === Id);
         const price = products[productIndex].price;

         const temp = products[products.length - 1];
         products[products.length - 1] = products[productIndex];
         products[productIndex] = temp;
         products.pop();
         
         fs.writeFile(p, JSON.stringify(products), err => {
            if (!err) {
               Cart.deleteById(Id, price);
            }
         });
      });
   }
}