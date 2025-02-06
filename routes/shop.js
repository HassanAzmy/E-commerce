const express = require('express');
const path = require('path');

const router = express.Router();
const shopController = require('../controllers/shopController');
const productsController = require('../controllers/productsController');

router.get('/', productsController.getIndex);

router.get('/products', productsController.getProducts);

router.get('/product-details/:productId', productsController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);


module.exports = router;