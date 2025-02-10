const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/errorController');
const sequelize = require('./utility/database');
const { log } = require('console');

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
app.use(errorController.get404);

//* It syncs models to the database by creating tables
sequelize.sync()
   .then(result => {
      console.log('Server has been started');
      app.listen(3000);
   })
   .catch(err => console.log(err));