import Product from '../models/product-model.js';
import express from 'express';

/** @param {express.Request} req */
export async function getProducts (req, res, next) {
   try {
      const products = await Product.findAll();
      res.render('shop/product-list', {
         prods: products,
         pageTitle: 'Products'
      });
   } catch(err) {
      console.log(err);
   };
};

/** @param {express.Request} req */
export async function getProductDetails (req, res, next) {
   try {
      const productId = req.params.productId;

      //* Product.findAll({where : {id: productId}}) also can be used but it will returns an array
      const product = await Product.findByPk(productId);
      // console.log(product);

      res.render('shop/product-details', {
         product,
         pageTitle: product.title,
         url: '/products'
      });
   } catch (err) {
      console.log(err);
   };
};

/** @param {express.Request} req */
export async function getIndex (req, res, next) {
   try {
      const products = await Product.findAll();
      res.render('shop/index', {
         prods: products,
         pageTitle: 'Shop'
      });   
   } catch (err) {
      console.log(err);
   };
};