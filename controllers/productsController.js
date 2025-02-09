const Product = require('../models/ProductModel');

exports.getProducts = (req, res, next) => {
   Product.findAll()
      .then(products => {
         res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Products'
         });
      })
      .catch(err => console.log(err));
};

exports.getProductDetails = (req, res, next) => {
   const productId = req.params.productId;
   Product.fetchProductById(productId)
      .then(([product]) => {
         console.log(product);
         res.render('shop/product-details', {
            product: product[0],
            pageTitle: 'Product Details',
            url: '/products'
         });
      })
      .catch(err => {
         console.log(err);
      });

   // Product.fetchProductById(productId, product => {
   //    res.render('shop/product-details', {
   //       product,
   //       pageTitle: 'Product Details',
   //       url: '/products'
   //    });
   // });
};

exports.getIndex = (req, res, next) => {
   Product.findAll()
      .then(products => {
         res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop'
         });   
      })
      .catch(err => console.log(err));
};