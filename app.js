const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//* body-parser is a middleware that parses the incoming request body
//* extended: false means that the body-parser will only parse simple bodies for URL encoded data
app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
   res.send(`
      <form action="/product" method="POST">
         <input type="text" name="title">
         <button type="submit">Add Product</button>
      </form>
   `);
});

app.use('/product', (req, res, next) => {
   //NOTE: without a body parser, we can't parse the incoming request body
   console.log(req.body);  //* undefined
   res.redirect('/');
});

//* default path for all routes
app.use('/', (req, res, next) => {
   res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);

