const Product = require('../models/ProductModel');
const express = require('express');

/** @param {express.Request} req */
exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      url: '/admin/add-product',
      editing: false
   });
};

/** @param {express.Request} req */
exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;
   const productId = req.params.productId;
   Product.findByPk(productId)
   .then(product => {
      res.render('admin/edit-product', {
         product: product,
         pageTitle: 'Edit Product',
         editing: editMode
      });
   })
   .catch(err => {
      console.log(err);
   });
};

/** @param {express.Request} req */
exports.postEditProduct = (req, res, next) => {
   const requestBody = req.body;
   const updatedTitle = requestBody.title;
   const updatedImageUrl = requestBody.imageUrl;
   const updatedPrice = requestBody.price;
   const updatedDescription = requestBody.description;
   const productId = requestBody.productId;
   //* we can use findByPk and update each property (product.title = updatedTitle) then product.save()
   Product.update(
      {
         title: updatedTitle,
         imageUrl: updatedImageUrl,
         price: updatedPrice,
         description: updatedDescription
      }, 
      {
         where: {
            Id: productId
         }
      }
   )
   .then(() => {
      res.redirect('/admin/Products');
   })
   .catch(err => {
      console.log(err);
   });
};
   
/** @param {express.Request} req */
exports.postAddProduct = (req, res, next) => {
   const body = req.body;
   const title = body.title;
   const imageUrl = body.imageUrl;
   const price = body.price;
   const description = body.description;
   req.user.createProduct({
      title,
      imageUrl,
      price,
      description
   })
      .then(() => {
         res.redirect('/admin/Products');
      })
      .catch(err => console.log(err));

   //* here we assign the Id while creating the product 
   // Product.create(
   //    {
   //       title,
   //       imageUrl,
   //       price,
   //       description,
   //       userId: req.user.Id
   //    }
   // )
};

/** @param {express.Request} req */
exports.postDeleteProduct = async (req, res, next) => {
   const productId = req.body.productId;
   //* we can use findByPk then product.destroy() on the recieved product
   try {
      await Product.destroy(
         {
            where: {
               Id: productId
            }
         }
      );
      res.redirect('/admin/Products');
   } catch(err) {
      console.log(err);
   }
};

/** @param {express.Request} req */
exports.getProducts = (req, res, next) => {
   Product.findAll()
      .then(products => {         
         res.render('admin/products', {
            prods: products,
            pageTitle: 'Products'
         });
      });
};