import express from 'express';
import Product from '../models/product-model.js';

/** @param {express.Request} req */
export async function getCartProducts (req, res, next) {
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
export async function postAddToCart (req, res, next) {
    try {
        const prodId = req.body.productId;
        const product = await Product.findById(prodId);
        const queryRes = await req.user.addToCart(product);
        console.log(queryRes);
        res.redirect('/products');

        // let newQuantity = 1;
        // let product; 
        // const cart = await req.user.getCart();
        // const products = await cart.getProducts({ where: { Id: prodId } });
        // const productIsExist = products.length > 0;
        // if (productIsExist) {
        //     product = products[0];
        //     const oldQuantity = product.cartItem.quantity;            
        //     newQuantity = oldQuantity + 1;
        // }
        // else {        
        //     product = await Product.findByPk(prodId);
        // }
        // const queryRes = await cart.addProduct(product, {
        //     through: {
        //         quantity: newQuantity
        //     }
        // });        
        // res.redirect('/cart');
    } catch (err) {
        console.log(err);
    };
}

/** @param {express.Request} req */
export async function postDeletFromCart (req, res) {
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
export async function getCheckout (req, res, next) {
    res.render('shop/checkout', {
    pageTitle: 'Checkout'
    });
};

/** @param {express.Request} req */
export async function getOrders (req, res, next) {
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
export async function postOrder (req, res, next) {
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