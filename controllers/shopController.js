const Product = require('../models/ProductModel');
const Cart = require('../models/cart-model');
const express = require('express');

/** @param {express.Request} req */
exports.getCartProducts = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            res.render('shop/cart', {
                products,
                pageTitle: 'Cart'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

/** @param {express.Request} req */
exports.postAddToCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {Id: prodId}});
        })
        .then(products => {
            if(products.length > 0) {
                const product = products[0];
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQuantity
                }
            });
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {console.log(err)})
}

/** @param {express.Request} req */
exports.postDeletFromCart = (req, res) => {
   const prodId = req.body.productId;

   req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {Id: prodId}});
    })
   .then(products => {
        const product = products[0];
        return product.cartItem.destroy();
   })
   .then(() => {
       res.redirect('/cart');
   })
   .catch(err => {console.log(err)})
}

/** @param {express.Request} req */
exports.getCheckout = (req, res, next) => {
   // Product.fetchAll()
   //    .then(() => {
   //       res.render('shop/checkout', {
   //          pageTitle: 'Checkout'
   //       });
   //    })
   //    .catch(err => console.log(err));
};

/** @param {express.Request} req */
exports.getOrders = (req, res, next) => {
   // Product.fetchAll()
   //    .then( () => {
   //       res.render('shop/orders', {
   //          pageTitle: 'Orders'
   //       });
   //    })
   //    .catch(err => console.log(err));
};

/** @param {express.Request} req */
exports.postOrder = (req, res, next) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            return req.user
                .createOrder()
                .then(order => {
                    order.addProducts(products.map(product => {
                        product.orderItem = {
                            quantity: product.cartItem.quantity
                        };
                        return product;
                    }));
                })
                .catch(err => console.log(err));
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};