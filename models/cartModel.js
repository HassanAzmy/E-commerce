const path = require('path');
const fs = require('fs');
const { log } = require('console');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
   static addProduct(Id, productPrice) {
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
         }
         else {
            cart.products.push({
               Id,
               quantity: 1
            });
         }
         cart.totalPrice += +productPrice;
         fs.writeFile(p, JSON.stringify(cart), err => {
            console.log(err);            
         })
      });
   }
}