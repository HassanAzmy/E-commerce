const express = require('express');

const Product = require('../models/product-model');
const Cart = require('../models/cart-model');
const  Sequelize  = require('sequelize').Sequelize;


/** @param {express.Request} req */
exports.getCartProducts = async (req, res, next) => {
    try {
        const cart = await req.user.getCart();
        const products = await cart.getProducts();
        res.render('shop/cart', {
            products,
            pageTitle: 'Cart'
        });
    } catch (err) {
        console.log(err);
    };
};

/** @param {express.Request} req */
exports.postAddToCart = async (req, res, next) => {
    try {
        const prodId = req.body.productId;
        let newQuantity = 1;
        let product; 

        const cart = await req.user.getCart();
        const products = await cart.getProducts({ where: { Id: prodId } });
    
        //* product exists in the cart 
        if (products.length > 0) {
            product = products[0];
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
        }
        else {        
            product = await Product.findByPk(prodId);
        }
        const queryRes = await cart.addProduct(product, {
            through: {
                quantity: newQuantity
            }
        });        
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    };
}

/** @param {express.Request} req */
exports.postDeletFromCart = async (req, res) => {
    try {
        const prodId = req.body.productId;

        const cart = await req.user.getCart();
        const products = await cart.getProducts({ where: { Id: prodId } });
        const product = products[0];        
        const queryRes = await product.cartItem.destroy();

        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    };
}

/** @param {express.Request} req */
exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
    pageTitle: 'Checkout'
    });
};

/** @param {express.Request} req */
exports.getOrders = async (req, res, next) => {
    try {
        //* eager loading
        const orders = await req.user.getOrders({include: Product});
        res.render('shop/orders', {
            orders,
            pageTitle: 'Orders'
        });
    } catch (err) {
        console.log(err);
    };
};

/** @param {express.Request} req */
exports.postOrder = async (req, res, next) => {
    try {
        const cart = await req.user.getCart();
        const products = await cart.getProducts();
        const order = await req.user.createOrder();
        const queryRes = await order.addProducts(products.map(product => {
            product.orderItem = {
                quantity: product.cartItem.quantity
            };
            return product;
        }));
        const removalFromCart = await cart.setProducts(null);
        res.redirect('/orders');
    } catch (err) {
        console.log(err);
    };
};