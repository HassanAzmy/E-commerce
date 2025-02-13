const express = require('express');
const path = require('path');

const router = express.Router();
const shopController = require('../controllers/shop-controller');
const productsController = require('../controllers/products-controller');

router.get('/', productsController.getIndex);

router.get('/products', productsController.getProducts);

router.get('/product-details/:productId', productsController.getProductDetails);

router.get('/cart', shopController.getCartProducts);

router.post('/cart', shopController.postAddToCart);

router.post('/delete-from-cart', shopController.postDeletFromCart);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

module.exports = router;