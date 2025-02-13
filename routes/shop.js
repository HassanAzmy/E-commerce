import express from 'express';
import * as shopController from '../controllers/shop-controller.js';
import * as productsController from '../controllers/products-controller.js';

const router = express.Router();

router.get('/', productsController.getIndex);

router.get('/products', productsController.getProducts);

router.get('/product-details/:productId', productsController.getProductDetails);

router.get('/cart', shopController.getCartProducts);

router.post('/cart', shopController.postAddToCart);

router.post('/delete-from-cart', shopController.postDeletFromCart);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder);

export default router;