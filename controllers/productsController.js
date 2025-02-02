// const products = [];

const Product = require('../models/ProductModel');

exports.getAddProduct = (req, res, next) => {
   res.render('add-product', {
      pageTitle: 'Adding Products'
   });
};

exports.postAddProduct = (req, res, next) => {
   // products.push({ title: req.body.title });
   const product = new Product(req.body.title);
   // products.push(product);
   product.save();
   res.redirect('/');
};

exports.getProducts = (req, res, next) => {
   const products = Product.fetchAll(products => {
      res.render('shop', {
         prods: products,
         pageTitle: 'Shop'
      });
   });
   
};