const products = [];

exports.getAddProduct = (req, res, next) => {
   res.render('add-product', {
      pageTitle: 'Adding Products'
   });
};

exports.postAddProduct = (req, res, next) => {
   products.push({ title: req.body.title });
   res.redirect('/');
};

exports.getProducts = (req, res, next) => {
   res.render('shop', {
      prods: products,
      pageTitle: 'Shop'
   });
};