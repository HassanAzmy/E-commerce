const Product = require('../models/ProductModel');
const express = require('express');

/** @param {express.Request} req */
exports.getProducts = (req, res, next) => {
   Product.findAll()
      .then(products => {
         res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Products'
         });
      })
      .catch(err => console.log(err));
};

/** @param {express.Request} req */
exports.getProductDetails = (req, res, next) => {
   const productId = req.params.productId;
   //* Product.findAll({where : {id: productId}}) also can be used but it will returns an array
   Product.findByPk(productId)
      .then(product => {
         console.log(product);
         res.render('shop/product-details', {
            product,
            pageTitle: product.title,
            url: '/products'
         });
      })
      .catch(err => {
         console.log(err);
      });
};

/** @param {express.Request} req */
exports.getIndex = (req, res, next) => {
   Product.findAll()
      .then(products => {
         res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop'
         });   
      })
      .catch(err => console.log(err));
};