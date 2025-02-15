import express from 'express';
import Product from '../models/product-model.js';

/** @param {express.Request} req */
export async function getCartProducts (req, res, next) {
    try {
        const cartProducts = await req.user.getCart();
        res.render('shop/cart', {
            products: cartProducts,
            pageTitle: 'Cart'
        });
    } catch (err) {
        console.log(err);
    };
};

/** @param {express.Request} req */
export async function postAddToCart (req, res, next) {
    try {
        const prodId = req.body.productId;
        const product = await Product.findById(prodId);
        const queryRes = await req.user.addToCart(product);
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    };
}

/** @param {express.Request} req */
export async function postDeletFromCart (req, res) {
    try {
        const prodId = req.body.productId;
        const queryRes = await req.user.deleteFromCart(prodId);
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    };
}

/** @param {express.Request} req */
export async function getOrders (req, res, next) {
    try {
        const orders = await req.user.getOrder();
        res.render('shop/orders', {
            orders,
            pageTitle: 'Orders'
        });
    } catch (err) {
        console.log(err);
    };
};

/** @param {express.Request} req */
export async function postOrder (req, res, next) {
    try {        
        const order = await req.user.addOrder();        
        res.redirect('/cart');
    } catch (err) {
        console.log(err);
    };
};

/** @param {express.Request} req */
export async function getCheckout(req, res, next) {
    res.render('shop/checkout', {
        pageTitle: 'Checkout'
    });
};