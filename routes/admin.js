const express = require('express');
const path = require('path');

const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

// router.get('/edit-product', adminController);

// router.post('/edit-product', adminController);

module.exports = router; 