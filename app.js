const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   res.locals.url = req.originalUrl;
   next();
})

app.use('/admin', adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
   res.status(404).render('404', { pageTitle: 'Page Not Found', message: 'Page Not Found!'});
});

app.listen(3000);