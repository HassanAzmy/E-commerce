const express = require('express');
const router = express.Router();

//* using get instead of use checking the exact path
router.get('/', (req, res, next) => {
   res.send('<h1>Hello from Express!</h1>');
});

module.exports = router;