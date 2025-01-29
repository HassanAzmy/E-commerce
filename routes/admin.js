const express = require('express');
const path = require('path');
const rootDir = require('../utility/path');

const router = express.Router();
const products = [];

//* /admin/add-product
router.get('/add-product', (req, res, next) => {
   // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

   res.render('add-product', {pageTitle: 'Adding Products'});
});

//* we can use the same path for different methods (get and post)
//* /admin/add-product
router.post('/add-product', (req, res, next) => {
   products.push({title: req.body.title});
   res.redirect('/');
});

exports.routes = router;
exports.products = products;