const Product = require('../models/ProductModel');
const Cart = require('../models/cartModel');

exports.getCartProducts = (req, res, next) => {
   Cart.fetchAll()
      .then(([cart]) => {
         res.render('shop/cart', {
            cart,
            pageTitle: 'Cart'
         });
      })
      .catch(err => {
         console.log(err);         
      });
};

exports.postAddToCart = (req, res, next) => {
   const prodId = req.body.productId;
   Product.fetchProductById(prodId)
      .then(([product]) => {
         Cart.addProduct(prodId, product[0].title, product[0].price)
         .then(() => {
            res.redirect('/cart');
         })
         .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
}

exports.postDeletFromCart = (req, res) => {
   const prodId = req.body.productId;
   
   Cart.deleteFromCart(prodId)
      .then(() => {
         res.redirect('/cart');
      })
      .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
   Product.fetchAll()
      .then(() => {
         res.render('shop/checkout', {
            pageTitle: 'Checkout'
         });
      })
      .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
   Product.fetchAll()
      .then( () => {
         res.render('shop/orders', {
            pageTitle: 'Orders'
         });
      })
      .catch(err => console.log(err));
};