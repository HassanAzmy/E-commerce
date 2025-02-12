const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const errorController = require('./controllers/errorController');
const sequelize = require('./utility/database');
const Product = require('./models/ProductModel');
const User = require('./models/userModel');
const { log } = require('console');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
   res.locals.url = req.originalUrl;
   User.findByPk(1)
      .then(user => {
         //* Sequelize object
         // console.log(user);
   
         req.user = user;
         next();
      })
      .catch(err => console.log(err));
})

app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
//* User(1) => Product(M)
User.hasMany(Product);

//* It syncs models to the database by creating tables
//* It also defines the relations in the database
//* force: true => to forcly override the database if exists
// sequelize.sync({force: true})
sequelize.sync()
   .then(result => {
      return User.findByPk(1);
   })
   .then(user => {
      if(!user) {
         return User.create({name: 'Azmy', email: 'Azmy@test.com'});
      }
      return user;
   })
   .then(user => {
      // console.log(user);
      app.listen(3000);
   }) 
   .catch(err => console.log(err));