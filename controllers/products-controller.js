import Product from '../models/product-model.js';
import express from 'express';

/** @param {express.Request} req */
export async function getProducts (req, res, next) {
   try {
      const products = await Product.fetchAll();
      res.render('shop/product-list', {
         prods: products,
         pageTitle: 'Products'
      });
   } catch(err) {
      console.log(err);
   };
};


/** @param {express.Request} req */
export async function getIndex(req, res, next) {
   try {
      const products = await Product.fetchAll();
      res.render('shop/index', {
         prods: products,
         pageTitle: 'Shop'
      });
   } catch (err) {
      console.log(err);
   };
};

/** @param {express.Request} req */
export async function getProductDetails (req, res, next) {
   try {
      const productId = req.params.productId;

      const product = await Product.findById(productId);
      res.render('shop/product-details', {
         product,
         pageTitle: product.title,
         url: '/products'
      });
   } catch (err) {
      console.log(err);
   };
};