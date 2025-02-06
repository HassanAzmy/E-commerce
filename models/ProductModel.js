const fs = require('fs');
const path = require('path');

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
   constructor(title, imageUrl, price, description) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.price = price;
      this.description = description;
      this.Id = Math.random().toString();
   }

   save() {
      getProductsFromFile(products => {
         products.push(this);
         fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
         });
      });      
   }
   
   static fetchAll(callback) {
      getProductsFromFile(callback);      
   }

   static fetchProductById(Id, callback) {
      getProductsFromFile(products => {
         // for (let product of products) 
         //    if(Id === product.Id) 
         //       return callback(product);
         // return null;

         const product = products.find(p => p.Id === Id);
         callback(product);
      });
   }
}