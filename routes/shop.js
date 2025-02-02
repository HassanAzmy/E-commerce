const express = require('express');
const path = require('path');

const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.getProducts);

module.exports = router;