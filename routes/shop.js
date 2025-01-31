const express = require('express');
const path = require('path');
const rootDir = require('../utility/path');

const router = express.Router();
const adminData = require('./admin');
const { log } = require('console');

router.get('/', (req, res, next) => {
   const products = adminData.products;
   
   res.render('shop', {prods: products, pageTitle: 'Shop', hasProducts: products.length > 0});
});

module.exports = router;