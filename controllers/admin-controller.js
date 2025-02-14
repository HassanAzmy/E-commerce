import Product from '../models/product-model.js'
import express from 'express';


// /** @param {express.Request} req */
export async function getProducts(req, res, next) {
   try {
      const products = await Product.fetchAll();
      res.render('admin/products', {
         prods: products,
         pageTitle: 'Products'
      });
   } catch (err) {
      console.log(err);
   }
};

/** @param {express.Request} req */
export function getAddProduct(req, res, next) {
   res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      url: '/admin/add-product',
      editing: false
   });
};

/** @param {express.Request} req */
export async function postAddProduct(req, res, next) {
   try {
      const body = req.body;
      const title = body.title;
      const imageUrl = body.imageUrl;
      const price = body.price;
      const description = body.description;
      const product = new Product(title, price, description, imageUrl);
      const queryRes =  await product.save();
      console.log('A product has been created');
      res.redirect('/admin/Products');
   } catch (err) {
      console.log(err);
   }
};

// /** @param {express.Request} req */
export async function getEditProduct (req, res, next) {
   try {
      const editMode = req.query.edit;
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      res.render('admin/edit-product', {
         product: product,
         pageTitle: 'Edit Product',
         editing: editMode
      });
   } catch(err) {
      console.log(err);
   }
};

// /** @param {express.Request} req */
export async function postEditProduct (req, res, next) {
   try {
      const requestBody = req.body;
      const updatedTitle = requestBody.title;
      const updatedImageUrl = requestBody.imageUrl;
      const updatedPrice = requestBody.price;
      const updatedDescription = requestBody.description;
      const productId = requestBody.productId;
      const newProduct = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl);
      newProduct.update(productId);
      console.log('A product has been updated');
      res.redirect('/admin/Products');
   } catch (err) {
      console.log(err);
   }
};

// /** @param {express.Request} req */
export async function postDeleteProduct (req, res, next) {
   try {
      const productId = req.body.productId;
      const queryRes = await Product.delete(productId);
      console.log('A product has been deleted');
      res.redirect('/admin/Products');
   } catch(err) {
      console.log(err);
   }
};