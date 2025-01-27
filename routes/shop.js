const express = require('express');
const path = require('path');
const rootDir = require('../utility/path');

const router = express.Router();

router.get('/', (req, res, next) => {
   //* "/" is the root path in our OS (D:\views\shop.html)
   //NOTE: __dirname gives the absolute path of the current file 
   //NOTE: which make our path independent of the OS. It will work on both windows and linux for example
   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;