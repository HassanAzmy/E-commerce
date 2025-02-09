const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

const fetchCartFromFile = (callback) => {
   fs.readFile(p, (err, fileContent) => {
      if(err)
         callback({products: [], totalPrice: 0.0});
      else
         callback(JSON.parse(fileContent));
   })
}
module.exports = class Cart {
   static fetchAll(callback) {
      fetchCartFromFile(cart => {
         callback(cart);
      });
   }

   static addProduct(Id, title, productPrice) {
      fetchCartFromFile(cart => {
         const productIndex = cart.products.findIndex(p => Id === p.Id);
         if (productIndex != -1) {
            cart.products[productIndex].quantity++;
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
      })
   }

   static deleteNonExistentProduct(Id, price) {
      fetchCartFromFile(cart => {
         const product = cart.products.find(p => p.Id === Id);
         if (product) {
            const quantity = product.quantity;
            cart.products = cart.products.filter(p => p.Id != Id);

            cart.totalPrice -= quantity * price;
            fs.writeFile(p, JSON.stringify(cart), err => {
               if (err)
                  console.log(err);
            });
         }
      })
   }

   static deleteFromCart(Id, price) {
      fetchCartFromFile(cart => {
         const product = cart.products.find(p => p.Id === Id);
         if (product) {
            product.quantity --;
            if (product.quantity < 1) {
               cart.products = cart.products.filter(p => p.Id != Id);
            }

            cart.totalPrice -= price;
            fs.writeFile(p, JSON.stringify(cart), err => {
               if (err)
                  console.log(err);
            });
         }
      })
   }
}