const Product = require('../models/ProductModel');
const Cart = require('../models/cartModel');

exports.getCart = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/cart', {
         pageTitle: 'Cart'
      });
   });
};

exports.postCart = (req, res, next) => {
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