const express = require('express');
const router = express.Router();
const path = require('path');

//* /admin/add-product
router.get('/add-product', (req, res, next) => {
   res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

//* we can use the same path for different methods (get and post)
//* /admin/add-product
router.post('/add-product', (req, res, next) => {
   console.log(req.body);  
   res.redirect('/');
});

module.exports = router;