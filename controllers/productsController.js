const Product = require('../models/ProductModel');

exports.getProducts = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/product-list', {
         prods: products,
         pageTitle: 'Products'
      });
   });
};

exports.getProduct = (req, res, next) => {
   const productId = req.params.productId;
   Product.fetchProductById(productId, product => {
      res.render('shop/product-details', {
         product,
         pageTitle: 'Product Details',
         url: '/products'
      });
   });
};

exports.getIndex = (req, res, next) => {
   Product.fetchAll(products => {
      res.render('shop/index', {
         prods: products,
         pageTitle: 'Shop'
      });
   });
};