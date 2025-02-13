const Product = require('../models/product-model');
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
exports.getEditProduct = async (req, res, next) => {
   try {
      const editMode = req.query.edit;
      const productId = req.params.productId;
      const products = await req.user.getProducts({ where: { Id: productId }})
      res.render('admin/edit-product', {
         product: products[0],
         pageTitle: 'Edit Product',
         editing: editMode
      });
   } catch(err) {
      console.log(err);
   }
};

/** @param {express.Request} req */
exports.postEditProduct = async (req, res, next) => {
   try {
      const requestBody = req.body;
      const updatedTitle = requestBody.title;
      const updatedImageUrl = requestBody.imageUrl;
      const updatedPrice = requestBody.price;
      const updatedDescription = requestBody.description;
      const productId = requestBody.productId;
      //* we can use findByPk and update each property (product.title = updatedTitle) then product.save()
      const queryRes = await Product.update(
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
      );
      res.redirect('/admin/Products');
   } catch (err) {
      console.log(err);
   }
};
   
/** @param {express.Request} req */
exports.postAddProduct = async (req, res, next) => {
   try {
      const body = req.body;
      const title = body.title;
      const imageUrl = body.imageUrl;
      const price = body.price;
      const description = body.description;
      const queryRes = await req.user.createProduct({
         title,
         imageUrl,
         price,
         description
      })
      res.redirect('/admin/Products');
   } catch (err) {
      console.log(err);
   }
};

/** @param {express.Request} req */
exports.postDeleteProduct = async (req, res, next) => {
   try {
      const productId = req.body.productId;
      //* we can use findByPk then product.destroy() on the recieved product
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
exports.getProducts = async (req, res, next) => {
   try {
      const products = await req.user.getProducts();
      res.render('admin/products', {
         prods: products,
         pageTitle: 'Products'
      });
   } catch (err) {
      console.log(err);
   }
};