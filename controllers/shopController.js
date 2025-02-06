const Product = require('../models/ProductModel');

exports.getCart = (req, res, next) => {
   const products = Product.fetchAll(products => {
      res.render('shop/cart', {
         pageTitle: 'Cart'
      });
   });
};

exports.postCart = (req, res, next) => {
   const prodId = req.body.productId;
   console.log(prodId);
   res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
   const products = Product.fetchAll(products => {
      res.render('shop/checkout', {
         pageTitle: 'Checkout'
      });
   });
};

exports.getOrders = (req, res, next) => {
   const products = Product.fetchAll(products => {
      res.render('shop/orders', {
         pageTitle: 'Orders'
      });
   });
};