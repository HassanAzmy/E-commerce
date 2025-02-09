const Product = require('../models/ProductModel');
const express = require('express');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      url: '/admin/add-product',
      editing: false
   });
};

exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;
   const productId = req.params.productId;
   Product.fetchProductById(productId)
   .then(([product]) => {
      res.render('admin/edit-product', {
         product: product[0],
         pageTitle: 'Edit Product',
         editing: editMode
      });
   })
   .catch(err => {
      console.log(err);
   });
};

exports.postEditProduct = (req, res, next) => {
   const requestBody = req.body;
   const updatedTitle = requestBody.title;
   const updatedImageUrl = requestBody.imageUrl;
   const updatedPrice = requestBody.price;
   const updatedDescription = requestBody.description;
   const productId = requestBody.productId;
   const updatedProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDescription, productId);
   updatedProduct.save()
      .then(() => {
         res.redirect('/admin/Products');
      })
      .catch(err => {
         console.log(err);
      });
}

exports.postAddProduct = (req, res, next) => {
   const body = req.body;
   const title = body.title;
   const imageUrl = body.imageUrl;
   const price = body.price;
   const description = body.description;
   Product.create({
      title,
      imageUrl,
      price,
      description
   })
      .then(result => console.log(result))
      .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
   const productId = req.body.productId;
   Product.deleteById(productId)
      .then(() => {
         res.redirect('/admin/products');
      })
      .catch(err => {
         console.log(err);
      });
}

exports.getProducts = (req, res, next) => {
   Product.fetchAll()
      .then(([products]) => {         
         res.render('admin/products', {
            prods: products,
            pageTitle: 'Products'
         });
      });
};