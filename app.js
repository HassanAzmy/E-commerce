const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
   console.log('In the second middleware!');
   res.send('<h1>Hello from add product page!</h1>');
});

app.use('/payment', (req, res, next) => {
   console.log('In the second middleware!');
   res.send('<h1>Hello from payment page!</h1>');
});

//* default path for all routes
app.use('/', (req, res, next) => {
   console.log('In the second middleware!');
   res.send('<h1>Hello from Express!</h1>');
});

//* won't be reached because of the previous middleware
app.use('/azmy', (req, res, next) => {
   console.log('In the second middleware!');
   res.send('<h1>Hello from azmy page!</h1>');
});

app.listen(3000);

