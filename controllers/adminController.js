const Product = require('../models/ProductModel');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/add-product', {
      pageTitle: 'Adding Products'
   });
};

exports.postAddProduct = (req, res, next) => {
   const body = req.body;
   const title = body.title;
   const imageUrl = body.imageUrl;
   const price = body.price;
   const description = body.description;
   const product = new Product(title, imageUrl, price, description);
   product.save();
   res.redirect('/');
};

exports.getProducts = (req, res, next) => {
   const products = Product.fetchAll(products => {
      res.render('admin/products', {
         prods: products,
         pageTitle: 'Products'
      });
   });
};