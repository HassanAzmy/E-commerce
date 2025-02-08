const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
   static addProduct(Id, title, productPrice) {
      fs.readFile(p, (err, fileContent) => {
         let cart = {
            products: [], 
            totalPrice: 0.0
         };
         if(!err) {
            cart = JSON.parse(fileContent);
         }
         const productIndex = cart.products.findIndex(p => Id === p.Id);         
         if(productIndex != -1) {
            cart.products[productIndex].quantity ++;
         } else {
            cart.products.push({
               Id,
               title,
               quantity: 1
            });
         }
         cart.totalPrice += +productPrice;
         fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);
         });
      });
   }

   static deleteById(Id, price) {
      fs.readFile(p, (err, fileContent) => {
         if(!err) {
            const cart = JSON.parse(fileContent);
            const product = cart.products.find(p => p.Id === Id);
            if (product) {
               const quantity = product.quantity;
               cart.products = cart.products.filter(p => p.Id != Id);                              

               cart.totalPrice -= quantity * price;
               fs.writeFile(p, JSON.stringify(cart), err => {
                  if(err)
                     console.log(err);
               });
            }
         }
      });
   }
}