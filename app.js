const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');

const adminData = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

//* hbs is the file extension for handlebars files except the main layout file
app.engine('hbs', handlebars.engine({
      defaultLayout: 'main-layout',
      layoutsDir: 'views/layouts/',
      extname: 'hbs' //* this extension is applied only to the layout file
   }
));
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   res.locals.url = req.originalUrl;
   next();
})

app.use('/admin', adminData.routes);
app.use(shopRouter);

app.use((req, res, next) => {
   res.status(404).render('404', { pageTitle: 'Page Not Found', message: 'Page Not Found!'});
});

app.listen(3000);