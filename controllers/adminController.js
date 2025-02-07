const Product = require('../models/ProductModel');

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
   Product.fetchProductById(productId, product => {
      res.render('admin/edit-product', {
         product,
         pageTitle: 'Edit Product',
         editing: editMode
      });
   })
   
};

exports.postEditProduct = (req, res, next) => {
   const requestBody = req.body;
   const updatedTitle = requestBody.title;
   const updatedImageUrl = requestBody.imageUrl;
   const updatedPrice = requestBody.price;
   const updatedDescription = requestBody.description;
   const productId = requestBody.productId;
   const updatedProduct = new Product(updatedTitle, updatedImageUrl, updatedPrice, updatedDescription, productId);
   console.log(updatedProduct.Id);
   updatedProduct.save();
   res.redirect('/');
}

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