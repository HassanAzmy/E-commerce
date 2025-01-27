const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

//* in case the paths are common in part of the path we can filter this common part
app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
   res.status(404).send('<h1>404 Page not found</h1>');
});

app.listen(3000);

