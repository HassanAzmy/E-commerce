const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

//* we can use the middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

//* in case the paths are common in part of the path we can filter this common part
app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);