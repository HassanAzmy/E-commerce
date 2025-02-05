const Product = require('../models/ProductModel');

exports.getProducts = (req, res, next) => {
   const products = Product.fetchAll(products => {
      res.render('shop/product-list', {
         prods: products,
         pageTitle: 'Products'
      });
   });
};

exports.getIndex = (req, res, next) => {
   const products = Product.fetchAll(products => {
      res.render('shop/index', {
         prods: products,
         pageTitle: 'Shop'
      });
   });
};