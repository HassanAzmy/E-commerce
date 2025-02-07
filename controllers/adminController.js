const Product = require('../models/ProductModel');

exports.getAddProduct = (req, res, next) => {
   res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      url: '/admin/add-product'
   });
};

exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;
   if(!editMode) {
      return res.redirect('/');
   }
   res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      editing: editMode
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