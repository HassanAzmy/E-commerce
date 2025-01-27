const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));

//* in case the paths are common in part of the path we can filter this common part
app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
// adding a view folder to serve html files
app.listen(3000);