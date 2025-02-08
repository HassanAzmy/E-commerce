const Product = require('../models/ProductModel');
const Cart = require('../models/cartModel');

exports.getCartProducts = (req, res, next) => {
   Cart.fetchAll(cart => {
      Product.fetchAll(products => {
         const cartProducts = [];
         for (let product of products) {
            const cartProduct = cart.products.find(p => p.Id === product.Id);
            if (cartProduct) {
               cartProducts.push({
                  productData: product,
                  quantity: cartProduct.quantity
               });
            }
         }
         res.render('shop/cart', {
            cartProducts,
            totalPrice: cart.totalPrice,
            pageTitle: 'Cart'
         });
      })
   });
};

exports.postAddToCart = (req, res, next) => {
   const prodId = req.body.productId;
   Product.fetchProductById(prodId, product => {
      Cart.addProduct(prodId, product.title, product.price)
   });
   res.redirect('/cart');

   //* OR we can send the price as a hidden field
   // const prodPrice = req.body.productPrice;
   // Cart.addProduct(prodId, prodPrice);
   // res.redirect('/cart');
}

exports.postDeletFromCart = (req, res) => {
   const prodId = req.body.productId;
   Product.fetchProductById(prodId, product => {
      Cart.deleteFromCart(prodId, product.price);
      res.redirect('/cart');
   })
}

exports.getCheckout = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/checkout', {
         pageTitle: 'Checkout'
      });
   });
};

exports.getOrders = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/orders', {
         pageTitle: 'Orders'
      });
   });
};